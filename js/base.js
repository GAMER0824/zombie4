class Base{
    constructor(x,y,width,height,color){
        var ground_options = {
            isStatic: true
        }
        this.body = Bodies.rectangle(x,y,width,height,ground_options)
         World.add(world, this.body)

         this.color = color
         this.w = width
         this.h = height
      }  
    display(){
     var pos = this.body.position
     push()
     translate(pos.x,pos.y)
     fill(this.color)
     rectMode(CENTER)
     rect(0,0,this.w,this.h)
     pop()

    }
}