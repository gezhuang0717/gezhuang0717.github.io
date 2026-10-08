---
title: 附录 D. 习题与选解
date: '2026-10-08T00:00:00+03:00'
weight: 104
showPagination: false
description: 使用附录 A 数据计算 m_p/m_e，并解释为什么“原子质量主要来自原子核”成立。
reader_supplement: true
---

## 习题 1——电子与质子的质量比

使用附录 A 数据计算 {{< reader-math "inline" >}}m_p/m_e{{< /reader-math >}}，并解释为什么“原子质量主要来自原子核”成立。

**解：**

{{< reader-math "block" >}}\frac{938.27208943}{0.51099895069}\approx1836.15.{{< /reader-math >}}

即使一个中性原子有 {{< reader-math "inline" >}}Z{{< /reader-math >}} 个电子，其电子总静质量相对于约 {{< reader-math "inline" >}}A{{< /reader-math >}} 个核子的核质量仍很小。

## 习题 2——可见光单光子能量

求波长 {{< reader-math "inline" >}}500\,\mathrm{nm}{{< /reader-math >}} 光子的能量（eV）。

**解：**

{{< reader-math "block" >}}E=\frac{hc}{\lambda}
\approx\frac{1240\ \mathrm{eV\,nm}}{500\ \mathrm{nm}}
\approx2.48\ \mathrm{eV}.{{< /reader-math >}}

## 习题 3——弱相互作用长度尺度

用 {{< reader-math "inline" >}}m_Wc^2\approx80.4\,\mathrm{GeV}{{< /reader-math >}} 和 {{< reader-math "inline" >}}\hbar c\approx0.1973\,\mathrm{GeV\,fm}{{< /reader-math >}} 估算

{{< reader-math "block" >}}\ell\sim\frac{\hbar c}{m_Wc^2}.{{< /reader-math >}}

**解：**

{{< reader-math "block" >}}\ell\sim\frac{0.1973}{80.4}\ \mathrm{fm}
\approx2.45\times10^{-3}\ \mathrm{fm}
\approx2.45\times10^{-18}\ \mathrm{m}.{{< /reader-math >}}

## 习题 4——电子 汤川 耦合

使用

{{< reader-math "block" >}}y_e=\frac{\sqrt2m_e}{v}{{< /reader-math >}}

和 {{< reader-math "inline" >}}m_ec^2=0.510999\,\mathrm{MeV}{{< /reader-math >}}、{{< reader-math "inline" >}}v=246.22\,\mathrm{GeV}{{< /reader-math >}}，计算 {{< reader-math "inline" >}}y_e{{< /reader-math >}}。

**解：** 将 {{< reader-math "inline" >}}m_e{{< /reader-math >}} 化为 GeV，得

{{< reader-math "block" >}}y_e\approx2.94\times10^{-6}.{{< /reader-math >}}

这说明电子质量很小可以等价描述为电子 汤川 耦合极弱，但标准模型并不解释为什么这个无量纲数恰好这么小。

## 习题 5——QCD 热交叉温度换算

利用 {{< reader-math "inline" >}}k_B=8.617333262\times10^{-5}\,\mathrm{eV/K}{{< /reader-math >}}，把 {{< reader-math "inline" >}}156.5\,\mathrm{MeV}{{< /reader-math >}} 换算为 K。

**解：**

{{< reader-math "block" >}}T=\frac{156.5\times10^6\ \mathrm{eV}}
{8.6173\times10^{-5}\ \mathrm{eV/K}}
\approx1.82\times10^{12}\ \mathrm K.{{< /reader-math >}}

## 习题 6——为什么不存在光子静止系？

尝试在洛伦兹变换中令观察者速度 {{< reader-math "inline" >}}v=c{{< /reader-math >}}。

**解：**

{{< reader-math "block" >}}\gamma=(1-v^2/c^2)^{-1/2}{{< /reader-math >}}

在 {{< reader-math "inline" >}}v=c{{< /reader-math >}} 发散，因此普通惯性洛伦兹变换不存在把有质量观察者变换到光子静止系的有限变换。正确不变量陈述是光子四动量平方为零、光世界线满足 {{< reader-math "inline" >}}ds^2=0{{< /reader-math >}}。



[目录]({{< relref "books/mass-light/_index.md" >}})
