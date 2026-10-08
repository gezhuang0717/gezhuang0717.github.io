---
title: 5. 为什么普通物质的大部分质量是 QCD 质量
date: '2026-10-08T00:00:00+03:00'
weight: 5
showPagination: false
description: 价夸克标记守恒量子数，并未列出质子内部每一种激发。QCD 包含夸克运动、胶子场及相互作用。“颜色”是内部标记，不是真实可见颜色。下文近似跑动耦合公式用于高动量转移，不能把分母为零处当成质子质量的计算方法。
---

## 三个价夸克不是质量账单

价夸克标记守恒量子数，并未列出质子内部每一种激发。QCD 包含夸克运动、胶子场及相互作用。“颜色”是内部标记，不是真实可见颜色。下文近似跑动耦合公式用于高动量转移，不能把分母为零处当成质子质量的计算方法。


{{< reader-figure "original/proton_mass_qcd_zh.png" "核子质量主要来自 QCD 动力学，而不是价夸克裸质量简单相加。" >}}

## 5.1 QCD 拉格朗日量

量子色动力学由 {{< reader-math "inline" >}}SU(3)_C{{< /reader-math >}} 规范对称性描述。简化写法为

{{< reader-math "block" >}}\mathcal L_{\mathrm{QCD}}= -\frac14G^a_{\mu\nu}G^{a\mu\nu}
+\sum_q\bar q(i\gamma^\mu D_\mu-m_q)q.{{< /reader-math >}}

场强张量包含非阿贝尔自相互作用：

{{< reader-math "block" >}}G^a_{\mu\nu}=
\partial_\mu A^a_\nu-\partial_\nu A^a_\mu
+g_s f^{abc}A^b_\mu A^c_\nu.{{< /reader-math >}}

最后一项意味着胶子本身携带色荷并彼此相互作用，这是 QCD 与 QED 的关键差别之一。[Quantum Chromodynamics (2025)](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-qcd.pdf)

## 5.2 跑动耦合与渐近自由

重整化使强耦合常数依赖尺度。高能下的一圈近似写成

{{< reader-math "block" >}}\alpha_s(Q^2)\simeq
\frac{1}{b_0\ln(Q^2/\Lambda_{\mathrm{QCD}}^2)},{{< /reader-math >}}

其中

{{< reader-math "block" >}}b_0=\frac{33-2n_f}{12\pi}.{{< /reader-math >}}

当 {{< reader-math "inline" >}}Q{{< /reader-math >}} 增大时，{{< reader-math "inline" >}}\alpha_s{{< /reader-math >}} 变小，这就是渐近自由。Gross、Wilczek 和 Politzer 在 1973 年的工作奠定了这一发现。[Ultraviolet Behavior of Non-Abelian Gauge Theories (1973)](https://doi.org/10.1103/PhysRevLett.30.1343) · [Reliable Perturbative Results for Strong Interactions? (1973)](https://doi.org/10.1103/PhysRevLett.30.1346)

但“高能下夸克更自由”不能被解读为“强力彻底消失”。它说的是短距离/高动量转移下微扰展开变得更可控。

## 5.3 禁闭不是“因为找不到色荷中和伙伴”

实验中从未观察到自由孤立的单夸克或胶子。强子处于色单态，而把一对重色荷分离时，低能有效势在一定区域近似呈线性增长

{{< reader-math "block" >}}V(r)\sim \sigma r,{{< /reader-math >}}

其中 {{< reader-math "inline" >}}\sigma{{< /reader-math >}} 为弦张力。Wilson 回路为格点规范理论中的禁闭提供了经典判据。[Confinement of quarks (1974)](https://doi.org/10.1103/PhysRevD.10.2445)

当高能碰撞试图分离夸克时，场中储存的能量可以产生新的夸克--反夸克对并形成喷注与强子化，而不是观察到自由夸克。因此“三原色凑成白色”适合作为色单态的初级比喻，但不能作为禁闭的微观原因。

## 5.4 手征对称性破缺很重要，但它不等于禁闭

当轻夸克质量近似为零时，QCD 拉格朗日量具有近似手征对称性；真空中的夸克凝聚等非微扰效应会使该对称性自发破缺，并产生近似 Goldstone 玻色子——轻的 {{< reader-math "inline" >}}\pi{{< /reader-math >}} 介子。Nambu 与 Jona-Lasinio 的工作对理解这一机制具有历史意义。[Dynamical Model of Elementary Particles Based on an Analogy with Superconductivity. I (1961)](https://doi.org/10.1103/PhysRev.122.345)

手征对称性破缺与强子质量生成紧密相关，但把“核子约 99% 质量”全部归因于手征破缺，或者说“手征破缺把胶子束缚住”，都是过度简化。禁闭和手征动力学是 QCD 的不同非微扰现象，虽然它们在热 QCD 中会相互关联。

## 5.5 迹反常与核子质量

经典无质量 QCD 近似具有尺度对称性，但量子重整化引入尺度 {{< reader-math "inline" >}}\Lambda_{\mathrm{QCD}}{{< /reader-math >}}。能动张量的迹含有量子反常：

{{< reader-math "block" >}}T^\mu_{\ \mu}
=
\frac{\beta(g_s)}{2g_s}
G^a_{\rho\sigma}G^{a\rho\sigma}
+\sum_q m_q(1+\gamma_m)\bar q q.{{< /reader-math >}}

对静止核子态取矩阵元时，这个结构与核子质量直接相关。现代格点 QCD 与场论研究把核子质量分解成夸克质量项、夸克/胶子能量项及反常贡献，但不同分解具有方案和尺度依赖。最安全的教学表述是：

> **希格斯/汤川 机制设定基本夸克的质量参数，而 QCD 的非微扰动力学解释为什么由轻夸克组成的质子、中子却具有接近 1 GeV 的质量。** [Revisiting the proton mass decomposition (2020)](https://doi.org/10.1103/PhysRevD.102.114042) · [Lattice-QCD Validation of Hadron Mass and Trace-Anomaly Decomposition Sum Rules (2026)](https://doi.org/10.1103/5n46-717z)



[目录]({{< relref "books/mass-light/_index.md" >}}) · [上一章](../higgs/) · [下一章](../interactions/)
