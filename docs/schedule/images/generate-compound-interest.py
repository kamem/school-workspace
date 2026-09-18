"""授業用の複利グラフ。年率÷12で月末積立、税・手数料なし。"""
from pathlib import Path
from html import escape

OUT = Path(__file__).parent
monthly, annual = 30000, 0.05
rate = annual / 12

def balance(month):
    return monthly * ((1 + rate) ** month - 1) / rate

def text(x, y, value, size=24, fill='#24354B', weight=400, anchor='start'):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{fill}" font-weight="{weight}" text-anchor="{anchor}">{escape(value)}</text>'

parts = ['<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1040" viewBox="0 0 1600 1040">', '<rect width="1600" height="1040" fill="#F7F9FC"/>', '<g font-family="Hiragino Sans, Noto Sans CJK JP, sans-serif">']
parts += [text(90, 72, 'お金の授業  /  複利', 22, '#62748B', 600), text(90, 135, '積み立てたお金 ＋ 増えたお金も、運用される。', 42, weight=700), text(90, 185, '毎月3万円 × 年率5%を仮定したシミュレーション', 27)]
for year, x in [(10, 90), (20, 575), (30, 1060)]:
    principal = monthly * year * 12 / 10000
    total = balance(year * 12) / 10000
    parts += [f'<rect x="{x}" y="220" width="450" height="170" rx="18" fill="white" stroke="#E0E6EE"/>', text(x+26, 259, f'{year}年後', 24, '#62748B', 600), text(x+26, 311, f'約{round(total):,}万円', 40, weight=700), text(x+26, 353, f'元本 {principal:,.0f}万 ＋ 運用益 {round(total-principal):,}万', 23)]
# Chart unit: 万円. Monthly samples preserve the actual curve.
left, right, top, bottom = 160, 1500, 455, 855
sx = lambda m: left + (right-left)*m/360
sy = lambda v: bottom - (bottom-top)*v/3000
for value in range(0, 3001, 500):
    y = sy(value)
    parts += [f'<path d="M {left} {y} H {right}" stroke="#DEE5EF"/>', text(left-20, y+8, f'{value:,}', 20, '#62748B', anchor='end')]
parts += [text(left-20, top-24, '万円', 20, '#62748B', anchor='end')]
def points(values):
    return ' '.join(f'{x:.2f},{y:.2f}' for x,y in values)
principal_points = [(sx(m),sy(monthly*m/10000)) for m in range(361)]
total_points = [(sx(m),sy(balance(m)/10000)) for m in range(361)]
parts += [f'<polygon points="{points([(left,bottom)]+principal_points+[(right,bottom)])}" fill="#BCD0EC"/>', f'<polygon points="{points(total_points+principal_points[::-1])}" fill="#91DAC7"/>', f'<polyline points="{points(total_points)}" fill="none" stroke="#12856E" stroke-width="5"/>', f'<polyline points="{points(principal_points)}" fill="none" stroke="#6489BB" stroke-width="3"/>']
for year in [0, 10, 20, 30]:
    x = sx(year*12)
    parts += [text(x, bottom+36, f'{year}年', 22, '#62748B', anchor='middle')]
    if year:
        parts += [f'<circle cx="{x}" cy="{sy(balance(year*12)/10000)}" r="7" fill="#12856E" stroke="white" stroke-width="3"/>']
parts += [text(1240, 691, '運用で増えた分', 27, '#076653', 700), text(1090, 801, '積み立てた元本', 27, '#345981', 700), text(90, 941, '30年後には、運用で増えた分が積立元本を上回る計算に。', 29, weight=700), text(90, 986, '計算条件：月末に3万円積立・月利＝5%÷12・税金と手数料は考慮しない。金額は万円単位で四捨五入。', 19, '#62748B'), text(90, 1017, '一定の利率を仮定した計算例です。実際の運用には値動きがあり、この結果や元本は保証されません。', 19, '#62748B'), '</g></svg>']
(OUT / 'compound-interest.svg').write_text('\n'.join(parts), encoding='utf-8')
for year in [10,20,30]:
    print(year, round(balance(year*12)/10000))
