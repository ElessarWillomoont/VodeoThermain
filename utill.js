function getLocationsWithColor(imagData, color){
    const locs = [];

    for(let i = 0; i < imagData.data.length; i += 4){
        const pColor = {
            r: imagData.data[i],
            g: imagData.data[i + 1],
            b: imagData.data[i + 2],
        };
        
        const pIndex = i / 4;
        const loc = {
            x: pIndex % imagData.width,
            y: Math.floor(pIndex / imagData.width),
        };

        if (colorMatch(pColor, color)){
            locs.push(loc);
        }
    }
    return locs;
}

function colorMatch(c1, c2, treshold = 180){
    return (sqDistance(c1, c2) < treshold*treshold);
}

function sqDistance(c1, c2){
    return (c1.r - c2.r) ** 2 +
        (c1.g - c2.g) ** 2 +
        (c1.b - c2.b) ** 2
}

function distance(c1, c2){
    return Math.sqrt(sqDistance(c1,c2))
}

function average(locs){
    const res={x:0,y:0};
    locs.forEach(loc => {
        res.x+=loc.x;
        res.y+=loc.y;
    });
    res.x/=locs.length;
    res.y/=locs.length;
    return res;
}

