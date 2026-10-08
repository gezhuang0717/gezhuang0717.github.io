---
title: 1. 物质的层级：原子、原子核、核子与场
date: '2026-10-08T00:00:00+03:00'
weight: 1
showPagination: false
description: 原子是量子束缚系统，并非坚硬小球。“半径”通常描述分布或特征尺度。1 飞米等于 10⁻¹⁵ m，1 纳米等于 10⁻⁹ m。原子核承担几乎全部原子质量，电子云决定主要尺寸。下文场方程若未写明国际单位制，则采用
  ℏ=c=1。
---

## 先建立尺度感

原子是量子束缚系统，并非坚硬小球。“半径”通常描述分布或特征尺度。1 飞米等于 10⁻¹⁵ m，1 纳米等于 10⁻⁹ m。原子核承担几乎全部原子质量，电子云决定主要尺寸。下文场方程若未写明国际单位制，则采用 ℏ=c=1。


## 1.1 原子并不是缩小版的“实心小球”

典型原子尺度约为 {{< reader-math "inline" >}}10^{-10}\,\mathrm{m}{{< /reader-math >}}，原子核尺度约为 {{< reader-math "inline" >}}10^{-15}{{< /reader-math >}}--{{< reader-math "inline" >}}10^{-14}\,\mathrm{m}{{< /reader-math >}}。电子在目前实验精度内与点粒子描述相容，而质子具有有限的电荷分布，特征尺度约为 {{< reader-math "inline" >}}0.84\,\mathrm{fm}{{< /reader-math >}}。因此普通物质不是由一层套一层的经典小球组成，而是跨越许多数量级的量子体系。[Review of Particle Physics (2026)](https://pdg.lbl.gov/2026/)

质量层级同样惊人。NIST 收录的 2022 CODATA 推荐值给出电子静能

{{< reader-math "block" >}}m_ec^2=0.510\,998\,950\,69(16)\ \mathrm{MeV},{{< /reader-math >}}

质子和中子分别为

{{< reader-math "block" >}}m_pc^2=938.272\,089\,43(29)\ \mathrm{MeV},{{< /reader-math >}}

{{< reader-math "block" >}}m_nc^2=939.565\,421\,94(48)\ \mathrm{MeV}.{{< /reader-math >}}

因此

{{< reader-math "block" >}}\frac{m_p}{m_e}=1836.152\,673\,426(32).{{< /reader-math >}}

这些数值和不确定度来自 2022 CODATA 基本常数调整。[CODATA recommended values of the fundamental physical constants: 2022 (2024)](https://physics.nist.gov/constants) · [Fundamental Physical Constants: 2022 CODATA Recommended Values (2024)](https://physics.nist.gov/cuu/Constants/)

对于质量数为 {{< reader-math "inline" >}}A{{< /reader-math >}}、原子序数为 {{< reader-math "inline" >}}Z{{< /reader-math >}} 的中性原子，其静质量绝大部分来自原子核。电子静质量一般只占 {{< reader-math "inline" >}}Zm_e/(A m_N){{< /reader-math >}} 的千分之一量级或更少；在精密质量学中，还必须进一步考虑电子结合能、原子核结合能以及原子电子缺失/增加带来的修正。

## 1.2 质子和中子不是基本粒子

质子的价夸克组成为 {{< reader-math "inline" >}}uud{{< /reader-math >}}，中子为 {{< reader-math "inline" >}}udd{{< /reader-math >}}。这里的“价夸克”非常重要：完整的核子态还包含动态的夸克--反夸克海以及胶子自由度。轻夸克质量参数在常用 {{< reader-math "inline" >}}\overline{\mathrm{MS}}{{< /reader-math >}} 方案和给定重整化尺度下只有数 MeV；由于色禁闭，单个夸克质量不是像电子质量那样能够直接隔离测量的可观测量。因此引用夸克质量时必须同时说明定义、方案与尺度。[Quark Masses (2025)](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-quark-masses.pdf)

本书第一条核心结论是：

> **复合量子体系的质量，一般不等于“构成成分静质量”的简单算术和。**

束缚的相对论量子体系，其静能还包含动能、场能、相互作用能、真空极化、对称性破缺效应以及经过重整化定义的算符贡献。对原子核还要加入核结合能；对原子还要加入更小的电子结合修正。

## 1.3 现代物理中，场比“小粒子图像”更基本

标准模型是一套相对论性量子场论。在这个语言中，电子不是一颗微小珠子在一个独立的“电子场”里游动；更准确地说，**电子是电子场的量子激发**。光子是电磁规范场的量子激发，夸克是夸克场的激发，胶子则是非阿贝尔 {{< reader-math "inline" >}}SU(3)_C{{< /reader-math >}} 规范场的量子。[Review of Particle Physics (2026)](https://pdg.lbl.gov/2026/)

最简单的自由实标量场可由拉格朗日量密度表示：

{{< reader-math "block" >}}\mathcal{L}=\frac12\partial_\mu\phi\,\partial^\mu\phi-
\frac12m^2\phi^2.{{< /reader-math >}}

对场进行量子化后，每一个正常模都具有类似量子谐振子的离散激发结构。这里的“量子化”意味着特定模式的能量交换以量子为单位发生，而不是意味着宇宙存在一个统一固定的“最小能量”。

## 1.4 真空期望值不等于真空能量

这是大众科普里极容易混淆的一点。一个场的真空期望值

{{< reader-math "block" >}}\langle0|\phi|0\rangle{{< /reader-math >}}

等于零，并不意味着真空没有零点涨落，也不意味着真空总能量为零。同样，希格斯场具有非零真空期望值，也不能简单翻译成“希格斯场储存了一桶能量给其他粒子吸收”。真空期望值、真空能量密度、涨落关联函数是不同的物理对象。



[目录]({{< relref "books/mass-light/_index.md" >}}) · [下一章](../standard-model/)
