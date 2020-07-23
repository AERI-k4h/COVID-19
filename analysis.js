const fs = require('fs')
const combinatorics = require('js-combinatorics')
const natural = require('natural')
const sw = require('stopword')

const reuse = require('d3-force-reuse')
const d3 = require('d3')

// Time counter

const start = Date.now()

// Load JSON

fs.readFile(__dirname + '/data/authors.json', (err, json) => {
    if (err) throw err
    analysis(JSON.parse(json))
})

// Text analysis

const analysis = authors => {

    // Reduce authors

    const nodes = authors.filter(a => a.docs >= 20)

    // a.docs >= 4

    //     nodes.json : 21,776,903kb for 6023 authors
    //      links.json : 280,582,249kb for 34329 links
    //    maxLinkValue : 5557
    //    minLinkValue : 206
    // maxCommonTokens : 40

    // Time computed 0h 13m 18s 252ms

    // Tokenizer

    const tokenizer = new natural.WordTokenizer()

    nodes.forEach((node, i) => {
        console.log('Tokenizing author #', i)
        node.tokens = tokenizer.tokenize(node.text.toLowerCase())
        delete node.text
    })

    // Singularize

    const inflector = new natural.NounInflector()
    const safeList = ['sars', 'trans', 'recsars', 'facs', 'mers', 'aids']

    nodes.forEach((node, i) => {
        console.log('Singularizing author #', i)
        node.tokens = node.tokens.map(t => {
            if ((safeList.includes(t) && t.length > 4) || /us$/.test(t) || /is$/.test(t))
                return t
            else
                return inflector.singularize(t)
        })
    })

    // Cleaning

    const stopWords = ['not', 'virus', 'coronavirus', 'covid', 'patient', 'republic', 'study', 'disiase', 'severe', 'balance', 'probable', 'feature', 'model', 'estimate']

    nodes.forEach((node, i) => {
        console.log('Cleaning author #', i)
        node.tokens = sw.removeStopwords(node.tokens, sw.en.concat(stopWords))
            .filter(token => token.length > 4)
            .filter(token => !parseInt(token))
    })

    // TF-IDF

    const frequency = new natural.TfIdf()

    nodes.forEach((node, i) => {
        console.log('Frequency for author #', i)
        frequency.addDocument(node.tokens)
    })

    // Set Tokens and Relevancy

    const max = 40

    nodes.forEach((node, i) => {

        console.log('Reducing for author #', i)

        node.tokens = frequency.listTerms(i)
            .slice(0, max)
            .reduce((tokens, token) => {
                tokens[token.term] = token.tfidf
                return tokens
            }, {})

        node.relevancy = Object.values(node.tokens).reduce((a, b) => a + b)
    })

    // Set links

    const links = []
    const minCommonTokens = 10

    for (let i1 = 0; i1 < nodes.length; i1++) {

        const n1 = nodes[i1]
        const t1 = Object.keys(n1.tokens)

        for (let i2 = i1 + 1; i2 < nodes.length; i2++) {

            const n2 = nodes[i2]
            const t2 = Object.keys(n2.tokens)

            const tokens = t1.filter(term => t2.includes(term))

            if (tokens.length <= minCommonTokens - 1)
                continue

            console.log('|', tokens.length, 'terms between', n1.name, 'and', n2.name)

            let link = links.find(link => link.source === n1.id && link.target === n2.id)

            tokens.forEach(token => {

                if (!link) link = links.find(link => link.source === n1.id && link.target === n2.id)

                const value = n1.tokens[token] + n2.tokens[token] / 2
                // console.log(value)

                if (link) {
                    link.value += value
                    link.tokens[token] = value
                } else {
                    const link = {
                        source: n1.id,
                        target: n2.id,
                        value: value,
                        tokens: {
                            [token]: value,
                        }
                    }

                    links.push(link)

                }
            })

            const tokensSorted = Object.entries(link.tokens).sort((a, b) => b[1] - a[1])
            link.tokens = Object.fromEntries(tokensSorted)

        }

    }

    
    // Normalization
    
    links.forEach(link => link.value = Math.floor(link.value))
    const maxLinkValue = links.reduce((max, link) => max > link.value ? max : link.value, 0)
    const minLinkValue = links.reduce((min, link) => min < link.value ? min : link.value, Infinity)
    const maxCommonTokens = links.reduce((max, link) => max > link.tokens.length ? max : link.tokens.length, 0)
    links.forEach(link => link.value = link.value / maxLinkValue)
        
    // Cleaning nodes without relations

    // const connectedNodes = links.reduce((array, link) => {
    //     if (!array.includes(link.source)) array.push(link.source)
    //     if (!array.includes(link.target)) array.push(link.target)
    //     return array
    // }, [])
    // nodes = nodes.filter(node => connectedNodes.includes(node.id))

    // Ethnicity

    console.log('\nEthnicity Dataset')

    const csv = require('csv-parser')

    fs.createReadStream('data/diaspora.csv')
        .pipe(csv({ separator: '|' }))
        .on('data', (row) => {
            const name = row['#uid'].split('/')[1]
            const nationality = row['ethnicity']
            const node = nodes.find(node => node.name == name)
            if (node) {
                const nodesWithId = nodes.filter(n => n.peers.includes(node.id))
                nodesWithId.forEach(node => {
                    if (!node.nationalities) node.nationalities = {}
                    if (node.nationalities[nationality])
                        node.nationalities[nationality]++
                    else
                        node.nationalities[nationality] = 1

                })
            }
        })
        .on('end', () => {
            network(nodes, links)
        })


    const network = (nodes, links) => {

        console.log('\nSimulation starts\n')

        const simulation = d3.forceSimulation()

        simulation
            .force('charge', reuse.forceManyBodyReuse()
                .strength(10)
            )
            .force('collide', d3.forceCollide()
                .radius(30)
                .strength(.5)
                .iterations(5)
            )
            .force('center', d3.forceCenter(0, 0))

        simulation
            .nodes(nodes)
            .force('link', d3.forceLink()
                .id(d => d.id)
                .strength(d => d.value)
            )
            .force('link').links(links)

        simulation
            .on('end', () => {
                triplets(nodes, links)
            })

    }

    // Triplets

    const triplets = (nodes, links) => {

        console.log('Triplets')

        const distance = 30
        const gap = 10
        const min = Math.pow(distance * 2 - gap, 2)
        const max = Math.pow(distance * 2 + gap, 2)
        const proximity = (a, b) => {
            const deltaX = Math.abs(a.x - b.x)
            const deltaY = Math.abs(a.y - b.y)
            const distance = Math.pow(deltaX, 2) + Math.pow(deltaY, 2)
            return (min < distance && distance < max)
        }

        let counter = 0
        let triplets = []

        for (let i1 = 0; i1 < nodes.length; i1++) {

            const n1 = nodes[i1]

            for (let i2 = i1 + 1; i2 < nodes.length; i2++) {

                const n2 = nodes[i2]

                if (!proximity(n1, n2)) continue

                const l1 = Object.keys(n1.tokens)
                const l2 = Object.keys(n2.tokens)
                const l12 = l1.filter(t => l2.includes(t))
                if (l12.length == 0) continue

                for (let i3 = i2 + 1; i3 < nodes.length; i3++) {

                    const n3 = nodes[i3]

                    if (!proximity(n2, n3)) continue
                    if (!proximity(n3, n1)) continue

                    const l3 = Object.keys(n3.tokens)
                    let list = l12.filter(t => l3.includes(t))
                    if (list.length == 0) continue

                    const x = (n1.x + n2.x + n3.x) / 3
                    const y = (n1.y + n2.y + n3.y) / 3

                    list = list.map(token => {
                        const v1 = (n1.tokens[token])
                        const v2 = (n2.tokens[token])
                        const v3 = (n3.tokens[token])
                        return [token, v1 + v2 + v3]
                    })

                    triplets.push({
                        position: [x, y],
                        tokens: list.sort((a, b) => a - b)
                    })

                    counter += 1
                    console.log(counter)

                }
            }
        }

        writing(nodes, links, triplets)
    }

    const writing = (nodes, links, triplets) => {

        // Writing files

        fs.writeFile('./src/data/nodes.json', JSON.stringify(nodes), err => { if (err) throw err })
        fs.writeFile('./data/nodes.json', JSON.stringify(nodes, null, '\t'), err => { if (err) throw err })
        fs.writeFile('./src/data/links.json', JSON.stringify(links), err => { if (err) throw err })
        fs.writeFile('./data/links.json', JSON.stringify(links, null, '\t'), err => { if (err) throw err })
        fs.writeFile('./src/data/triplets.json', JSON.stringify(triplets), err => { if (err) throw err })
        fs.writeFile('./data/triplets.json', JSON.stringify(triplets, null, '\t'), err => { if (err) throw err })

        // Final report

        const format = x => JSON.stringify(x).length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        console.log('\n')
        console.log(`     nodes.json : ${format(nodes)}kb for ${nodes.length} authors`)
        console.log(`     links.json : ${format(links)}kb for ${links.length} links`)
        console.log(`   maxLinkValue : ${maxLinkValue}`)
        console.log(`   minLinkValue : ${minLinkValue}`)
        console.log(`maxCommonTokens : ${maxCommonTokens}`)

        // Time end

        const end = Date.now()
        const d = new Date(end - start)
        console.log(`\nTime computed ${d.getUTCHours()}h ${d.getUTCMinutes()}m ${d.getUTCSeconds()}s ${d.getUTCMilliseconds()}ms`)

    }

}

