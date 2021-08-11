class Stone{
    constructor(x,y,side){
        var options = {
            restitution: 0.8
        }
        this.body = Bodies.rectangle(x,y,side,side,options)
        World.add(world, this.body)

        this.r = side
        this.stone = loadImage("assets/stone.png")
     }  
   display(){
    var pos = this.body.position
    push()
    translate(pos.x,pos.y)
    rotate(this.body.angle)
    imageMode(CENTER)   
    image(this.stone,0,0,this.r,this.r)
    pop()

   
    }
}