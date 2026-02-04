function cubicBezier(x1, y1, x2, y2) {
  return function(progress) {

    // поиск t по заданному x (progress) методом Ньютона
    let t = progress;
    for (let i = 0; i < 6; i++) {
      const mt = 1 - t;

      const x = mt*mt*mt*0 +
                3*mt*mt*t*x1 +
                3*mt*t*t*x2 +
                t*t*t*1;

      const dx = 3*mt*mt*(x1 - 0) +
                  6*mt*t*(x2 - x1) +
                  3*t*t*(1 - x2);

      if (!dx) break;
      t -= (x - progress) / dx;
    }

    // итоговое значение y
    const mt = 1 - t;
    return mt*mt*mt*0 +
            3*mt*mt*t*y1 +
            3*mt*t*t*y2 +
            t*t*t*1;
  };
}
