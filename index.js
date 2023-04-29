let x = 0, r;
let v = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]; // to track divs clicked

// function to check wether someone won and scale up winning line
function check(n, m) {
    let i, j;

    // checks for rows and columns
    for (i = 0; i < 3; i++) {
        if (v[n][m] != v[i][m]) break;
    }
    if (i == 3) {
        for (i = 0; i < 3; i++) {
            k = document.getElementsByClassName("sq"+(i*3 + m + 1))[0].childNodes[r];
            k.style.scale = 1.5;
        }
        return true;
    }

    for (i = 0; i < 3; i++) {
        if (v[n][m] != v[n][i]) break;
    }
    if (i == 3) {
        for (i = 0; i < 3; i++) {
            k = document.getElementsByClassName("sq"+(n*3 + i + 1))[0].childNodes[r];
            k.style.scale = 1.5;
        }
        return true;
    }

    // checks for digonals
    for (i = 0, j = 0; i < 3; i++, j++) {
        if (v[n][m] != v[j][i]) break;
    }
    if (i == 3) {
        for (i = 0, j = 0; i < 3; i++, j++) {
            k = document.getElementsByClassName("sq"+(j*3 + i + 1))[0].childNodes[r];
            k.style.scale = 1.5;
        }
        return true;
    }

    for (i = 2, j = 0; j < 3; i--, j++) {
        if (v[n][m] != v[j][i]) return false;
    }
    if (j == 3) {
        for (i = 2, j = 0; j < 3; i--, j++) {
            k = document.getElementsByClassName("sq"+(j*3 + i + 1))[0].childNodes[r];
            k.style.scale = 1.5;
        }
        return true;
    }
    return false;
}

// this reveals the circle or cross
function anime(z) {
    z.style.scale = "1";
    z.style.opacity = "1";
    z.style.borderRadius = "0";
}

// this hides the circle or cross
function revAnime(z) {
    z.style.scale = "0";
    z.style.opacity = "0";
    z.style.borderRadius = "50%";
}

// takes the coordinates of div clicked and ignors if already been clicked
function clicked(c, n, m) {
    if (v[n][m] > -1) return;
    r = x % 2;
    v[n][m] = r;
    anime(c.childNodes[r]);

    if (check(n, m)) {
        x = -1;
        for(let i=0; i<3; i++) {
            for(let j=0; j<3; j++) {
                v[i][j] = 0;
            }
        }
    }

    // if no one wins, yet to develop, want to contribute? :)
    if(x < 8) x++;
    else console.log("draw");
}

function reset() {
    let k1 = document.getElementsByClassName("cross");
    let k2 = document.getElementsByClassName("circle");
    for(let i=0; i<3; i++) for(let j=0; j<3; j++) {
        if (v[i][j] < 0) continue;
        revAnime(k1[i*3 + j]);
        revAnime(k2[i*3 + j]);
        v[i][j] = -1;
    }
}