---
title: 6. 规范对称性与四种基本相互作用
date: '2026-10-08T00:00:00+03:00'
weight: 6
showPagination: false
description: 整体对称性在所有位置使用同一变换。规范描述允许随位置改变场变量的选择，但可测量预测保持不变。规范冗余并不意味着实验多出一种物理状态。协变导数将普通导数与规范场结合。广义相对论以时空几何描述引力，引力不属于标准模型规范群。
---

## 对称性究竟改变什么

整体对称性在所有位置使用同一变换。规范描述允许随位置改变场变量的选择，但可测量预测保持不变。规范冗余并不意味着实验多出一种物理状态。协变导数将普通导数与规范场结合。广义相对论以时空几何描述引力，引力不属于标准模型规范群。


## 6.1 “规范对称性”究竟是什么

规范对称性不是现实空间中某个几何物体的旋转对称。它描述的是理论内部自由度在局域变换下的冗余表示结构。Yang 与 Mills 在 1954 年把非阿贝尔规范思想系统化，为后来弱相互作用和强相互作用的场论基础打开道路。[Conservation of Isotopic Spin and Isotopic Gauge Invariance (1954)](https://doi.org/10.1103/PhysRev.96.191)

群的维数满足

{{< reader-math "block" >}}\dim U(1)=1,\qquad
\dim SU(2)=3,\qquad
\dim SU(3)=8.{{< /reader-math >}}

这意味着相应李代数分别具有 1、3、8 个生成元，并不是说 {{< reader-math "inline" >}}SU(2){{< /reader-math >}} 是“三维球”、{{< reader-math "inline" >}}SU(3){{< /reader-math >}} 是“八维球”。

## 6.2 电磁相互作用

QED 的规范群是 {{< reader-math "inline" >}}U(1)_{\mathrm{EM}}{{< /reader-math >}}，传播量子为无质量光子。精细结构常数定义为

{{< reader-math "block" >}}\alpha=\frac{e^2}{4\pi\epsilon_0\hbar c},{{< /reader-math >}}

2022 CODATA 给出

{{< reader-math "block" >}}\alpha^{-1}=137.035\,999\,177(21).{{< /reader-math >}}

[CODATA recommended values of the fundamental physical constants: 2022 (2024)](https://physics.nist.gov/constants) · [Fundamental Physical Constants: 2022 CODATA Recommended Values (2024)](https://physics.nist.gov/cuu/Constants/)

无质量光子使静态电磁势在真空中具有长程 {{< reader-math "inline" >}}1/r{{< /reader-math >}} 行为。注意，“相互作用由交换虚光子产生”是微扰 QFT 中的一种计算语言，不能把虚光子理解成可以被探测器直接抓到的普通实光子小球。

## 6.3 弱相互作用

弱带电流由 {{< reader-math "inline" >}}W^\pm{{< /reader-math >}} 介导，中性流由 {{< reader-math "inline" >}}Z{{< /reader-math >}} 介导。由于 {{< reader-math "inline" >}}W/Z{{< /reader-math >}} 具有约 80--91 GeV 的质量，低能弱作用可近似成短程四费米相互作用，其典型尺度常用

{{< reader-math "block" >}}\ell\sim\frac{\hbar c}{m_Wc^2}{{< /reader-math >}}

估计，得到约 {{< reader-math "inline" >}}10^{-18}\,\mathrm{m}{{< /reader-math >}} 量级。更精确的散射截面与衰变率必须使用完整电弱理论。[Electroweak Model and Constraints on New Physics (2025)](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-standard-model.pdf)

## 6.4 强相互作用

QCD 由 8 个胶子规范场描述。胶子无静质量，但由于非阿贝尔自相互作用与色禁闭，低能世界中不存在自由长程“库仑式色力”。在核尺度上，质子和中子之间的剩余强相互作用可由介子交换等有效理论描述，它与基本夸克--胶子 QCD 力需要区分。

## 6.5 引力

经典引力目前由广义相对论描述：

{{< reader-math "block" >}}G_{\mu\nu}+\Lambda g_{\mu\nu}
=\frac{8\pi G}{c^4}T_{\mu\nu}.{{< /reader-math >}}

标准模型并不包含引力。把引力线性化后可以形式上得到自旋 2 量子“引力子”的概念，但至今没有引力子的直接实验发现，也没有一套被实验确认的完整量子引力理论。

普朗克能量定义为

{{< reader-math "block" >}}E_{\mathrm{P}}=\sqrt{\frac{\hbar c^5}{G}}
\approx1.22\times10^{19}\ \mathrm{GeV}.{{< /reader-math >}}

这只是一个由 {{< reader-math "inline" >}}\hbar,c,G{{< /reader-math >}} 构造出的自然尺度，不能解读成“只要建一台达到这个单粒子碰撞能量的加速器就自动得到万有理论”。



[目录]({{< relref "books/mass-light/_index.md" >}}) · [上一章](../qcd/) · [下一章](../early-universe/)
