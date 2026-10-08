---
title: 3. 相对论中的质量与能量
date: '2026-10-08T00:00:00+03:00'
weight: 3
showPagination: false
description: 不变质量对所有惯性观察者相同；总能量和动量随参考系变化。静能写作 E₀=mc²，动能 K=E−E₀。自然单位中常将质量写成 GeV；恢复国际单位制后质量单位应为
  GeV/c²。复合系统须先相加各组分的能量和动量，再求整体不变质量。
---

## 质量、动量与单位

不变质量对所有惯性观察者相同；总能量和动量随参考系变化。静能写作 E₀=mc²，动能 K=E−E₀。自然单位中常将质量写成 GeV；恢复国际单位制后质量单位应为 GeV/c²。复合系统须先相加各组分的能量和动量，再求整体不变质量。


## 3.1 完整公式不是只有 {{< reader-math "inline" >}}E=mc^2{{< /reader-math >}}

狭义相对论真正通用的能量--动量关系是

{{< reader-math "block" >}}E^2=p^2c^2+m^2c^4.{{< /reader-math >}}

在粒子静止系 {{< reader-math "inline" >}}p=0{{< /reader-math >}}，才得到

{{< reader-math "block" >}}E_0=mc^2.{{< /reader-math >}}

对无质量粒子 {{< reader-math "inline" >}}m=0{{< /reader-math >}}，则

{{< reader-math "block" >}}E=pc.{{< /reader-math >}}

因此光子虽然没有静质量，仍然具有能量和动量。现代粒子物理一般使用不变质量（rest/invariant mass），不再鼓励“运动质量随速度增加”的旧式说法。[Zur Elektrodynamik bewegter K\"orper (1905)](https://doi.org/10.1002/andp.19053221004) · [Review of Particle Physics (2026)](https://pdg.lbl.gov/2026/)

由四动量 {{< reader-math "inline" >}}p^\mu=(E/c,\mathbf p){{< /reader-math >}} 可写

{{< reader-math "block" >}}p_\mu p^\mu=m^2c^2.{{< /reader-math >}}

不变质量因此是洛伦兹不变量，不依赖观察者惯性系。

## 3.2 自然单位

高能物理常取

{{< reader-math "block" >}}\hbar=c=1,{{< /reader-math >}}

于是质量、动量、能量都可用 eV、MeV、GeV 表示。常用换算是

{{< reader-math "block" >}}\hbar c\simeq197.3269804\ \mathrm{MeV\,fm},{{< /reader-math >}}

以及

{{< reader-math "block" >}}1\ \mathrm{GeV}^{-1}\simeq0.1973\ \mathrm{fm}.{{< /reader-math >}}

CODATA 体系中，真空光速为定义值

{{< reader-math "block" >}}c=299\,792\,458\ \mathrm{m\,s^{-1}},{{< /reader-math >}}

普朗克常数也在 2019 年 SI 重定义后成为精确定义值

{{< reader-math "block" >}}h=6.626\,070\,15\times10^{-34}\ \mathrm{J\,s}.{{< /reader-math >}}

基本电荷

{{< reader-math "block" >}}e=1.602\,176\,634\times10^{-19}\ \mathrm{C}{{< /reader-math >}}

同样是 SI 定义常数。[CODATA recommended values of the fundamental physical constants: 2022 (2024)](https://physics.nist.gov/constants) · [Fundamental Physical Constants: 2022 CODATA Recommended Values (2024)](https://physics.nist.gov/cuu/Constants/)

## 3.3 复合体系的质量就是静止系总能量

对于一个复合体系，若总四动量为 {{< reader-math "inline" >}}P^\mu{{< /reader-math >}}，其不变质量满足

{{< reader-math "block" >}}M^2c^2=P_\mu P^\mu.{{< /reader-math >}}

在质心系 {{< reader-math "inline" >}}\mathbf P=0{{< /reader-math >}}，有

{{< reader-math "block" >}}Mc^2=E_{\mathrm{total}}.{{< /reader-math >}}

这就是为什么核结合能、夸克和胶子的场能、动能都能改变复合体系质量。核反应与精密 Penning-trap 质量测量中常用

{{< reader-math "block" >}}Q=(M_i-M_f)c^2{{< /reader-math >}}

把质量差直接转换成反应或衰变能量。



[目录]({{< relref "books/mass-light/_index.md" >}}) · [上一章](../standard-model/) · [下一章](../higgs/)
