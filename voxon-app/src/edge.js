/*

Applications of Evolutionary 
Computation: Parametric Robot — Graphics & Physics Framework

by Oskar Garcia | og2236

------------------------------------------------------------------------------*/

var Edge = function(from, to) {
    
    this.from = from;
    this.to = to;
    
    this.length = vec3.length(vec3.subtract(from.position, to.position, []));
    
    this.nominalLength = this.length * (1 + 0.1 * Math.random());
 
    this.vector = vec3.create();
};

Edge.strength = 120;

Edge.prototype = {
    
    update : function() {
        
        vec3.subtract(this.to.position, this.from.position, this.vector);
        
        this.length = vec3.length(this.vector);
        vec3.normalize(this.vector);
        
        vec3.scale(this.vector, - Edge.strength * (this.length - this.nominalLength));
        
        vec3.add(this.to.force, this.vector);
        vec3.add(this.from.force, vec3.negate(this.vector));
                    
    }
    
};
