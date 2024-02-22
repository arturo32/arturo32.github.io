const lightShadow = (p) => {
    let size;
    let segs;

    p.setup = function() {
        size = 500;
        let canvas = p.createCanvas(size, size);
        if(canvas.parent().offsetWidth < size){
            size = canvas.parent().offsetWidth;
            p.resizeCanvas(size, size);
        }
        segs = [
            //seg
            {a: {x:0.04 * size, y:0.6*size}, b: {x: 0.5*size, y: 0.3*size}},
            {a: {x:0.4*size, y:0.6*size}, b: {x: 0.28*size, y: 0.2*size}},
            {a: {x:0.5*size, y:0.3*size}, b: {x: 0.28*size, y: 0.2*size}},

            {a: {x:0.64*size, y:0.6*size}, b: {x: 0.76*size, y: 0.6*size}},
            {a: {x:0.76*size, y:0.6*size}, b: {x: 0.76*size, y: 0.72*size}},
            {a: {x:0.76*size, y:0.72*size}, b: {x: 0.64*size, y: 0.72*size}},
            {a: {x:0.64*size, y:0.72*size}, b: {x: 0.64*size, y: 0.6*size}},


            //border
            {a: {x:0, y:0}, b: {x: size, y: 0}},
            {a: {x:0, y:0}, b: {x: 0, y: size}},
            {a: {x:size, y:0}, b: {x: size, y: size}},
            {a: {x:0, y:size}, b: {x: size, y: size}}
        ]
        p.background(220);
    }

    function getIntersection(r, s){

        let r_px = r.a.x;
        let r_py = r.a.y;
        let r_dx = r.b.x - r.a.x;
        let r_dy = r.b.y - r.a.y;

        let s_px = s.a.x;
        let s_py = s.a.y;
        let s_dx = s.b.x - s.a.x;
        let s_dy = s.b.y - s.a.y;

        //Are they parallel?
        if(r_dx*s_dy == r_dy*s_dx){
            return null;
        }

        const T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx);

        const T1 = (s_py+s_dy*T2-r_py)/r_dy;

        if(T1 < 0){
            return null;
        }
        if(T2 < 0 || T2 > 1){
            return null;
        }

        return {
            x: r_px+r_dx*T1,
            y: r_py+r_dy*T1,
            param: T1
        };
    }





    p.draw = function() {
        p.background(0);
        p.stroke('red');
        p.strokeWeight(1);
//   for(let T1 = 0; T1 < 200; T1++){
//     let ray_x = 20+1*T1;
//     let ray_y = 30+1*T1;
//     point(ray_x, ray_y);
//   }

        //line(ray.a.x, ray.a.y, mouseX, mouseY);



        p.stroke('red');
        for(let seg of segs){
            p.line(seg.a.x, seg.a.y, seg.b.x, seg.b.y);
        }

        p.beginShape();
        for(let j = 0; j < p.PI*2; j+=p.PI*2/50){
            let ray = {a: {x: p.mouseX, y: p.mouseY}, b: {x: p.mouseX+p.sin(j), y: p.mouseY+p.cos(j)}};
            //Finding the closest intersection
            let closestIntersection = null;
            for(let seg of segs){
                let intersect = getIntersection(ray, seg);
                if(!intersect) continue;
                if(!closestIntersection || intersect.param < closestIntersection.param){
                    closestIntersection = intersect;
                }
            }
            p.stroke('white');
            if(closestIntersection){
                p.line(ray.a.x, ray.a.y, closestIntersection.x, closestIntersection.y);
                //line(ray.a.x, ray.a.y, closestIntersection.b.x, closestIntersection.b.y);
                // vertex(closestIntersection.a.x, closestIntersection.a.y);
                //vertex(closestIntersection.b.x, closestIntersection.b.y);
                p.fill('white');
                p.circle(closestIntersection.x, closestIntersection.y, 5);
            }
        }
        p.endShape(p.CLOSE);

        // stroke(0);
        // for(let T2 = 0; T2 < 150; T2++){
        //   let s_dx = 1;
        //   let s_dy = -1;
        //   let seg_x = 20+s_dx*T2;
        //   let seg_y = 300+s_dy*T2;
        //   point(seg_x, seg_y);
        // }

    }
}
