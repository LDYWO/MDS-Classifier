/**
 * Created by igorcorrea on 03/12/2015.
 */

function Da(){
    this.x;
    this.y;
    this.scaledX;
    this.scaledY;
    this.labelX;
    this.labelY;
    this.scale;
    this.key;
    this.arc;
    this.color;
    this.r;
    this.dimensionnames;
    this.anchorname;
    this.anchorForceX;
    this.anchorForceY;
    this.weight;

    this.updateBasedOnNewArc = function(rv) {
        //console.log(super);
        var arc = this.arc + rv.arc;
        var Sigmoid = 1/(1+Math.exp(-this.weight));

        this.x = Math.cos(arc) * (rv.r);
        this.y = Math.sin(arc) * (rv.r);

        this.anchorForceX = Math.cos(arc) * (rv.r) * Sigmoid;
        this.anchorForceY = Math.sin(arc) * (rv.r) * Sigmoid;

        this.labelX =Math.cos(arc) * (rv.r);
        this.labelY = ((Math.sin(arc) * (rv.r))) - 15;

        //*/
        this.scaledX = rv.x + Math.cos(arc) * (rv.getScaledR() - this.r/2);
        this.scaledY = rv.y + (Math.sin(arc) * -(rv.getScaledR() - this.r/2));

    }

    this.getInfo = function(){
        return "key: " + this.key + "\n" +
            "pos: " + [this.x, this.y] + "\n" +
            "labelPos: " + [this.labelX, this.labelY] + "\n"; }
}

