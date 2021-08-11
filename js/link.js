class link {
    constructor(bodyA,bodyB){
        var lastlink = bodyA.body.bodies.length - 2;
        this.link = Constraint.create({
            bodyA: bodyA.body.bodies[lastlink],
            pointA: { x: 0, y: 0 },
            bodyB: bodyB.body,
            pointB: { x: 0, y:0},
            length: 10,
            stiffness: 0.8
        })
        
        World.add(world, this.link)
    }

    //Added the detach function in Link.js to remove the constraint from the world
    detach() {
        World.remove(world, this.link);
      }
}