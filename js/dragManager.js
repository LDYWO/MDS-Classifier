/**
 * Created by igorcorrea on 03/12/2015.
 */
setupDragBehaviour = function(rvInst,name) {

    var dragInst = d3.behavior.drag()
        .origin(function(d) { return d; })
        .on("drag", function (d, i) {
            createDragBehaviour(rvInst, this, i);
        });

    var dragRvInst = d3.behavior.drag()
    //.origin(function(d) { return d; })
        .on("drag", function () {
            //d3.event.delta
            var rv = {}
            rv = rvInst;

            var da = rv.da;

            var x = (d3.event.x - rv.x);
            var y = (d3.event.y - rv.y);

            var mag = Math.sqrt(x*x + y*y);
            x = x/mag;
            y = y/mag;


            if(!rv.dragging) {
                rv.dragging = true;
                dragStartArc = Math.atan2(x,y) - pi/2;
                rvOrigArc = rv.arc;
            }
            else {

                var arcIncrement =  (Math.atan2(x,y) - pi/2) - dragStartArc;

                rv.arc = rvOrigArc +  arcIncrement;

                for(var i = 0; i < da.length; i++) {
                    da[i].updateBasedOnNewArc(rv);
                }

                rvInst.updateInst(true);

                rv.daGroup.selectAll("circle")
                    .attr("cx", function(d, i) {return da[i].x;})
                    .attr("cy", function(d, i) {return da[i].y;});

                rv.daLabelGroup.selectAll("text")
                    .attr("x", function(d, i) {return da[i].labelX;})
                    .attr("y", function(d, i) {return da[i].labelY;});
            }
        });




    d3.select('#'+ name + 'labelcircle').call(dragInst);
    d3.select('#'+ name + 'labeltext').call(dragInst);
    //rvInst.daGroup.selectAll('circle').call(dragInst);
    //rvInst.daLabelGroup.selectAll("text").call(dragInst);

}

createDragBehaviour = function(rv, circle, i) {

    var da = rv.da;

    var x = d3.event.x;
    var y = d3.event.y ;

    var xFromCenter = rv.x-x;
    var yFromCenter = rv.y-y;

    var mag = Math.sqrt(Math.pow(xFromCenter, 2) + Math.pow(yFromCenter, 2));

    console.log(mag);

    var arcDiff = (Math.atan2(x,-y) - pi/2) - da[i].arc;

    if(shitfPressed) {
        da[i].arc += arcDiff;
        da[i].updateBasedOnNewArc(rv);

        d3.select(circle)
            .attr("cx", da[i].x)
            .attr("cy", da[i].y);

    }

    else {
        for(var daCount = 0; daCount < da.length; daCount++) {
            da[daCount].arc += arcDiff;
            da[daCount].updateBasedOnNewArc(rv);

        }

        rv.daGroup.selectAll("circle")
            .attr("cx", function(d, i) {return da[i].x;})
            .attr("cy", function(d, i) {return da[i].y;});
    }


    rv.daLabelGroup.selectAll("text")
        .attr("x", function(d, i) {return da[i].labelX;})
        .attr("y", function(d, i) {return da[i].labelY;});

    var cur_rvs=[];
    cur_rvs.push(rv0.da,rv1.da,rv2.da,rv3.da,rv4.da,rv5.da);
    updateNode(cur_rvs,true);

}
