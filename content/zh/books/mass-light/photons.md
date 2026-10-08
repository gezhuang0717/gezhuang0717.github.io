---
title: 9. 光子、量子电动力学与“波粒二象性”
date: '2026-10-08T00:00:00+03:00'
weight: 9
showPagination: false
description: 普通频率 ν 是每秒周期数；角频率 ω=2πν，单位为弧度每秒。真空波长满足 λν=c。探测器通过局域事件吸收能量，量子态则可在多条路径上有振幅。简单单光子光电模型中，hν
  小于功函数时没有发射，不能解释成电子具有负动能。
---

## 频率、波长与探测

普通频率 ν 是每秒周期数；角频率 ω=2πν，单位为弧度每秒。真空波长满足 λν=c。探测器通过局域事件吸收能量，量子态则可在多条路径上有振幅。简单单光子光电模型中，hν 小于功函数时没有发射，不能解释成电子具有负动能。


## 9.1 Planck--Einstein 量子关系

光子的能量为

{{< reader-math "block" >}}E_\gamma=h\nu=\frac{hc}{\lambda}.{{< /reader-math >}}

Einstein 1905 年用光量子解释光电效应。单电子最大动能满足

{{< reader-math "block" >}}K_{\max}=h\nu-\phi,{{< /reader-math >}}

其中 {{< reader-math "inline" >}}\phi{{< /reader-math >}} 是材料逸出功。阈频

{{< reader-math "block" >}}\nu_0=\frac{\phi}{h}.{{< /reader-math >}}

[\"Uber einen die Erzeugung und Verwandlung des Lichtes betreffenden heuristischen Gesichtspunkt (1905)](https://doi.org/10.1002/andp.19053220607)

频率低于阈值时，在普通单光子光电效应条件下，即使增加光强也不能让单个光子越过逸出功；当频率高于阈值后，提高光强通常会增加光子通量，从而增加光电子数和光电流。因此“光电效应只与频率有关、完全与强度无关”是不正确的。

{{< reader-figure "original/photoelectric_zh.png" "光电效应：频率决定单光子能量，强度主要改变光子通量。" >}}

## 9.2 光子具有动量与 Compton 散射

无质量粒子满足

{{< reader-math "block" >}}p_\gamma=\frac{E}{c}=\frac{h}{\lambda}.{{< /reader-math >}}

Compton 散射中，出射光波长变化满足

{{< reader-math "block" >}}\Delta\lambda=\lambda'-\lambda
=\frac{h}{m_ec}(1-\cos\theta),{{< /reader-math >}}

其中

{{< reader-math "block" >}}\lambda_C=\frac{h}{m_ec}\approx2.426\times10^{-12}\ \mathrm{m}{{< /reader-math >}}

是电子 Compton 波长。Compton 1923 年实验为辐射量子具有能量和动量提供了经典证据。[A Quantum Theory of the Scattering of X-rays by Light Elements (1923)](https://doi.org/10.1103/PhysRev.21.483)

## 9.3 “波粒二象性”是历史性简写

现代量子理论不要求光在“有时变成波、有时变成小球”之间切换。更准确地说：电磁场是量子场；不同实验测量其不同可观测量，经典波、单光子计数、干涉、反聚束等行为由同一量子理论统一描述。

## 9.4 电磁场量子化

Dirac 早期量子辐射理论把光的发射和吸收描述为场量子的产生与湮灭。现代 QED 的核心拉格朗日量可写成

{{< reader-math "block" >}}\mathcal L_{\mathrm{QED}}
=\bar\psi(i\gamma^\mu D_\mu-m)\psi
-\frac14F_{\mu\nu}F^{\mu\nu}.{{< /reader-math >}}

其中

{{< reader-math "block" >}}D_\mu=\partial_\mu+ieA_\mu.{{< /reader-math >}}

QED 是人类实验检验最精密的理论体系之一。光子是 {{< reader-math "inline" >}}U(1)_{\mathrm{EM}}{{< /reader-math >}} 规范场的量子，而不是在“光子场”之外额外存在的一颗经典小球。[The quantum theory of the emission and absorption of radiation (1927)](https://doi.org/10.1098/rspa.1927.0039) · [Review of Particle Physics (2026)](https://pdg.lbl.gov/2026/)

## 9.5 光子不是宇宙统一的“最小能量包”

因为

{{< reader-math "block" >}}E=h\nu,{{< /reader-math >}}

只要允许更低频率，单个光子的能量就可以更低；不存在一个非零普适常数 {{< reader-math "inline" >}}E_{\min}{{< /reader-math >}} 使所有光子的能量都必须大于它。因此正确说法是：**给定电磁模式的能量交换是量子化的，单个量子称为光子；但“一个光子”不是一个固定大小的宇宙能量原子。**

此外，能量传递也不只靠光子。弱作用可以通过 {{< reader-math "inline" >}}W/Z{{< /reader-math >}}，强作用由胶子和强子自由度描述，引力波也可以携带经典能量。稳定的有质量粒子如电子不会因为“有静质量”就必须衰变。



**算例。** 真空波长 500 nm 对应光子能量 2.47968 eV。若教学功函数 Φ=2.00 eV，则 Kmax=0.47968 eV。低于阈值时，单光子过程不能发射电子。

[目录]({{< relref "books/mass-light/_index.md" >}}) · [上一章](../light/) · [下一章](../spacetime/)
