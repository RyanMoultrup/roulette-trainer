import crossfilter from 'crossfilter2';

const cf = crossfilter();

function print_filter(filter) {
    var f = eval(filter);
    if (typeof(f.length) != "undefined") {}else{}
    if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
    if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
    console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
};

const Registry = function () {
    let items = [];

    const add = function (item) {
        items.push(item)
    };

    return {
      add
    }
};

const registry = new Registry;

export function add (data) {
    return cf.add(data);
}

export function dimension (fn) {
    let dim = cf.dimension(fn);
    registry.add(dim);
    return dim;
}
