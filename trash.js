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
