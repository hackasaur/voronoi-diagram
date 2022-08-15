        const createSeed = (ctx, coords, radius, speed, theta) => {
            const properties = {
                coords: coords,
                radius: radius,
                speed: speed,
                theta: theta
            }

            let deltaX = speed * Math.cos(theta)
            let deltaY = speed * Math.sin(theta)

            return {
                getProperties: () => {
                    return properties
                },
                update: () => {
                    properties.coords[0] += deltaX
                    properties.coords[1] += deltaY
                },
                draw: () => {
                    ctx.beginPath()
                    ctx.arc(properties.coords[0], properties.coords[1], properties.radius, 0, 2 * Math.PI)
                    ctx.strokeStyle = 'green'
                    ctx.stroke()
                }
            }
        }


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
                    for (let point of seeds) {
                        let dist = distance_pythogoras(point, pixel)
                        if (dist < min_dist) {
                            min_dist = dist
                            closest_point = point
                        }
                    }

                    ctx.fillStyle = colors[seeds.indexOf(closest_point)]
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
