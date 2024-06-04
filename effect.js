class Effect {
    constructor(canvas, video){
        this.canvas = canvas;
        this.video = video;
        this.ctx = canvas.getContext("2d");

        const audioCtx = new AudioContext(); // 创建音频上下文
        this.osc = audioCtx.createOscillator(); // 创建振荡器节点
        this.gainNode = audioCtx.createGain(); // 创建增益节点（用于控制音量）

        this.osc.connect(this.gainNode); // 将振荡器连接到增益节点
        this.gainNode.connect(audioCtx.destination); // 将增益节点连接到音频输出

        this.osc.frequency.value = 0; // 初始频率设置为0
        this.gainNode.gain.value = 0; // 初始音量设置为0
        this.osc.start(); // 启动振荡器

        this.#animate(); // 开始动画循环
    }

    #animate(){
        const { ctx, canvas, video } = this;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height); // 将视频绘制到画布
        const imagData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        const locs = getLocationsWithColor(imagData, { r: 0, g: 255, b: 0 }); // 找到黄色像素
        ctx.fillStyle = "yellow";
        locs.forEach(loc => { ctx.fillRect(loc.x, loc.y, 1, 1); });

        if(locs.length > 0){
            const center = average(locs);
            const p = 1 - center.y / canvas.height;
            const freq = 200 + 500 * p; // 根据位置计算频率
            this.osc.frequency.value = freq; // 设置振荡器频率

            // 根据红点在x轴的位置设置音量
            const volume = center.x / canvas.width;
            this.gainNode.gain.value = volume; // 设置增益节点的音量

            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.arc(center.x, center.y, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath(); 
            
            // 画红点位置的水平线
            ctx.beginPath();
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 5;
            ctx.moveTo(0, center.y); 
            ctx.lineTo(canvas.width, center.y);
            ctx.stroke();
            ctx.closePath();

            // 画红点位置的竖直线
            ctx.beginPath();
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 5;
            ctx.moveTo(center.x, 0); 
            ctx.lineTo(center.x, canvas.height);
            ctx.stroke();
            ctx.closePath();
        } else {
            this.osc.frequency.value = 0; // 没有黄色像素时设置频率为0
            this.gainNode.gain.value = 0; // 没有黄色像素时设置音量为0
        }

        requestAnimationFrame(this.#animate.bind(this)); // 循环调用自己实现动画效果
    }
}
