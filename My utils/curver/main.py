def bezier_y_from_x(progress: float, x1: float, y1: float, x2: float, y2: float) -> float:
    t = progress
    mt = 1.0 - t

    y = (
        mt**3 * 0.0 +
        3 * mt**2 * t * y1 +
        3 * mt * t**2 * y2 +
        t**3 * 1.0
    )

    return y




progress = 1
x1, y1 = 0, 0
x2, y2 = 1, 1

y = bezier_y_from_x(progress, x1, y1, x2, y2)
#print(f"Значение y на кривой Безье: {y:.2f}")


for i in range(0,21):
  i /= 20
  print(i, "->", bezier_y_from_x(i, x1, y1, x2, y2))
