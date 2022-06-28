// This craziness comes from this wild thread about programmatically blending colors.
// https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
// https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)#micro-functions-version-4
export const RGB_Log_Blend = (p, c0, c1) => {
    let i = parseInt, r = Math.round, P = 1 - p, [a, b, c, d] = c0.split(","), [e, f, g, h] = c1.split(","),
        x = d || h,
        j = x ? "," + (!d ? h : !h ? d : r((parseFloat(d) * P + parseFloat(h) * p) * 1000) / 1000 + ")") : ")";
    return "rgb" + (x ? "a(" : "(") + r((P * i(a[3] === "a" ? a.slice(5) : a.slice(4)) ** 2 + p * i(e[3] === "a" ? e.slice(5) : e.slice(4)) ** 2) ** 0.5) + "," + r((P * i(b) ** 2 + p * i(f) ** 2) ** 0.5) + "," + r((P * i(c) ** 2 + p * i(g) ** 2) ** 0.5) + j;
}

export const getColor = (time) => {
    let color1 = "rgb(0,255,0)";
    let color2 = "rgb(255,0,0)";
    let percent = time.getSeconds() / 60
    let result = RGB_Log_Blend(percent, color1, color2)
    return (result)
}


