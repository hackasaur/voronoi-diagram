function main() {
    const canvas = document.getElementById('scene')
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d')
        // ctx.canvas.width = window.innerWidth / 2;
        // ctx.canvas.height = window.innerHeight / 2;

        ctx.canvas.width = 600;
        ctx.canvas.height = 600;

        const createPoint = (x, y) => {
            let point = new Uint16Array([x, y])
            return point
        }

        const setCanvasFont = (ctx, font) => {
            ctx.fillStyle = `${font.fontColor}`
            ctx.font = `${font.fontSize}px ${font.fontStyle}`
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

        paintBackground(ctx)

        let n = 100
        let points = []
        let colors = []

        for (let i = 0; i < n; i++) {
            points.push(createPoint(
                Math.round(ctx.canvas.width * Math.random()),
                Math.round(ctx.canvas.height * Math.random())
            ))
            colors[i] = `rgb(
                ${255 * Math.random()},
                ${255 * Math.random()},
                ${255 * Math.random()/3}
                )`
        }

        function draw_voronoi(x, y, width, height, points) {
            for (let i = 0; i < width; i++) {
                for (let j = 0; j < height; j++) {
                    let pixel = createPoint(i, j)
                    let min_dist = Infinity

                    let closest_point
                    for (let point of points) {
                        let dist = distance_manhattan(point, pixel)
                        // let dist = distance_pythagoras(point, pixel)
                        if (dist < min_dist) {
                            min_dist = dist
                            closest_point = point
                        }
                    }
                    ctx.fillStyle = colors[points.indexOf(closest_point)]
                    ctx.fillRect(x + i, y + j, 1, 1)
                }
            }

            for (let point of points) {
                ctx.fillStyle = "white"
                ctx.fillRect(point[0], point[1], 2, 2)
            }
        }

        draw_voronoi(0, 0, 600, 600, points)

        function startLoop() {
            let done = false
            let i = 0, j = 0
            let pixels_per_frame = 100

            function loop() {
                if (!done) {
                    window.requestAnimationFrame(loop)
                }


                for (let r = 0; r < pixels_per_frame; r++) {
                    if (j == ctx.canvas.height) {
                        i++
                        j = 0
                        if (i > ctx.canvas.width) {
                            done = true
                        }
                        break
                    }

                    let pixel = createPoint(i, j)
                    let min_dist = ctx.canvas.width + ctx.canvas.height

                    let closest_point
                    for (let point of points) {
                        let dist = distance_pythogoras(point, pixel)
                        if (dist < min_dist) {
                            min_dist = dist
                            closest_point = point
                        }
                    }

                    ctx.fillStyle = colors[points.indexOf(closest_point)]
                    ctx.fillRect(i, j, 1, 1)
                    j++
                }


                console.log("frame count")
            }
            loop()
        }
        // startLoop()
    }
}

window.addEventListener('load', main)