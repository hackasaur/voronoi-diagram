function main() {
    const canvas = document.getElementById('scene')
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d')
        ctx.canvas.width = window.innerWidth/2 + 100;
        ctx.canvas.height = window.innerHeight/2 + 100;

        // ctx.canvas.width = 600;
        // ctx.canvas.height = 600;

        const createPoint = (x, y) => {
            let point = new Uint16Array([x, y])
            return point
        }

        const distance_pythagoras = (p1, p2) => {
            return Math.sqrt(Math.pow((p1[0] - p2[0]), 2) + Math.pow((p1[1] - p2[1]), 2))
        }

        const distance_manhattan = (p1, p2) => {
            return (Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]))
        }

        function paintBackground(ctx) {
            ctx.fillStyle = 'Black'
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        }

        function generateRandomSeeds(n, gridDims) {
            let seeds = []
            for (let i = 0; i < n; i++) {
                seeds.push(createPoint(
                    Math.round((gridDims[0] - 1) * Math.random()),
                    Math.round((gridDims[1] - 1) * Math.random())
                ))
            }
            return seeds
        }

        function generateRandomColors(n) {
            let colors = []
            for (let i = 0; i < n; i++) {
                colors[i] = `rgb(
                ${255 * Math.random()},
                ${255 * Math.random()},
                ${255 * Math.random()}
                )`
            }
            return colors
        }

        function draw_voronoi(x, y, seeds, colors, pointPixelSize, gridDims) {
            for (let i = 0; i < gridDims[0]; i++) {
                for (let j = 0; j < gridDims[1]; j++) {
                    let point = createPoint(i, j)
                    let min_dist = Infinity

                    let closest_seed
                    for (let seed of seeds) {
                        let dist = distance_manhattan(seed, point)
                        // let dist = distance_pythagoras(seed, point)
                        if (dist < min_dist) {
                            min_dist = dist
                            closest_seed = seed
                        }
                    }
                    ctx.fillStyle = colors[seeds.indexOf(closest_seed)]
                    ctx.fillRect(x + (i * pointPixelSize), y + (j * pointPixelSize), pointPixelSize, pointPixelSize)
                }
            }

            for (let seed of seeds) {
                ctx.fillStyle = "white"
                ctx.fillRect(seed[0] * pointPixelSize, seed[1] * pointPixelSize, pointPixelSize, pointPixelSize)
            }
        }

        paintBackground(ctx)

        let n = 25 //number of seeds
        let pointPixelSize = 4 //1 point or cell will be n x n pixels big
        let gridDims = new Uint16Array(2)
        gridDims[0] = ctx.canvas.width/pointPixelSize //width of the grid
        gridDims[1] = ctx.canvas.width/pointPixelSize //height of the grid
        let seeds = generateRandomSeeds(n, gridDims)  // randomly generated seeds
        let colors = generateRandomColors(n) // randomly generate color for each seed

        draw_voronoi(0, 0, seeds, colors, pointPixelSize, gridDims)
    }
}

window.addEventListener('load', main)