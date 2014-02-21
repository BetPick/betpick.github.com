String.format = function () {
    if (arguments.length == 0) {
        return null;
    }
    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
}
var data = [];
for (var i = 0; i < d.length; i++) {
    m = d[i];
    data.push({
        score: m[0],
        result: m[1],
        time: m[2],
        text: m[3],
        odds: m[4]
    });
}
format = '<tr><td>{0}</td><td>{1}</td><td><span class="{3}">{2}</span></td><td>{4}</td><td>{5}</td></tr>';
yield = 0.0;
win = 0;
halfwin = 0;
lose = 0;
halflose = 0;
ignore = 0;
html = '';
for (var i = 0; i < data.length; i++) {
    a = data[i];
    color = '';
    switch (a.result) {
    case '赢':
        color = 'RED';
        yield += a.odds;
        win++;
        break;
    case '赢半':
        color = 'REDHALF';
        yield += a.odds * 0.5;
        halfwin++;
        break;
    case '走水':
        color = 'IGNORE';
        ignore++;
        break;
    case '输':
        color = 'BLACK';
        yield -= 1;
        lose++;
        break;
    case '输半':
        color = 'BLACKHALF';
        yield -= 0.5;
        halflose++;
        break;
    default:
        break;
    }
    html += String.format(format, a.time, a.score, a.text, color, a.result, a.odds);
}
table = "<table border='2px'><tr><th width='120px'>发表时间</th><th width='50px'>比分</th><th width='400px'>推荐比赛</th><th width='50px'>结果</th><th width='40px'>水位</th></tr><tbody id='tb_body'>{0}</tbody></table>";
table = String.format(table,html);
$(".entry-content").append(table);
/*
$('#header').html(String.format('推荐{0}场，{1}黑{2}黑半{3}走水{4}红半{5}红，收入:{6}，收益率：{7}%',
    data.length, lose, halflose, ignore, halfwin, win, yield.toFixed(2), ((yield / data.length) * 100).toFixed(1)
));
*/
