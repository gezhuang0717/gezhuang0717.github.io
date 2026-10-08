---
title: 4. 希格斯 场：它做什么，又不做什么
date: '2026-10-08T00:00:00+03:00'
weight: 4
showPagination: false
description: 真空是最低能量态，不只是“没有物体的地方”。真空期望值是该状态中的场算符平均。希格斯玻色子是非零希格斯背景附近的激发。下文质量关系是自然单位下的树级关系，精密比较需要辐射修正。上型夸克耦合共轭希格斯双重态，下型夸克使用通常的双重态。
---

## 场、真空与激发

真空是最低能量态，不只是“没有物体的地方”。真空期望值是该状态中的场算符平均。希格斯玻色子是非零希格斯背景附近的激发。下文质量关系是自然单位下的树级关系，精密比较需要辐射修正。上型夸克耦合共轭希格斯双重态，下型夸克使用通常的双重态。


{{< reader-figure "higgs-zh.svg" "希格斯 势与非零真空期望值。" >}}

## 4.1 为什么直接写规范玻色子质量会遇到问题

一个普通矢量场质量项形如

{{< reader-math "block" >}}\frac12m^2 A_\mu A^\mu.{{< /reader-math >}}

若直接给电弱规范场加入这种质量项，会破坏建立可重整化规范理论所需的规范结构。电弱理论因此需要一种既保持底层规范理论一致性、又让物理 {{< reader-math "inline" >}}W/Z{{< /reader-math >}} 获得质量的机制。Brout、Englert、希格斯、Guralnik、Hagen 与 Kibble 在 1964 年的工作建立了这类机制的关键场论结构。[Broken Symmetry and the Mass of Gauge Vector Mesons (1964)](https://doi.org/10.1103/PhysRevLett.13.321) · [Broken Symmetries and the Masses of Gauge Bosons (1964)](https://doi.org/10.1103/PhysRevLett.13.508) · [Global Conservation Laws and Massless Particles (1964)](https://doi.org/10.1103/PhysRevLett.13.585)

## 4.2 希格斯 势

标准模型 希格斯 双重态 {{< reader-math "inline" >}}\Phi{{< /reader-math >}} 的势可写为

{{< reader-math "block" >}}V(\Phi)= -\mu^2\Phi^\dagger\Phi+
\lambda(\Phi^\dagger\Phi)^2,{{< /reader-math >}}

其中 {{< reader-math "inline" >}}\mu^2>0{{< /reader-math >}}、{{< reader-math "inline" >}}\lambda>0{{< /reader-math >}}。势能最低点不是 {{< reader-math "inline" >}}\Phi=0{{< /reader-math >}}，而满足

{{< reader-math "block" >}}\Phi^\dagger\Phi=\frac{v^2}{2},{{< /reader-math >}}

其中

{{< reader-math "block" >}}v=(\sqrt{2}G_F)^{-1/2}\approx246.22\ \mathrm{GeV}.{{< /reader-math >}}

这里 {{< reader-math "inline" >}}G_F{{< /reader-math >}} 是从弱衰变精密测量得到的费米常数。[Electroweak Model and Constraints on New Physics (2025)](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-standard-model.pdf) · [Higgs Boson Physics, Status of (2025)](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-higgs-boson.pdf)

在幺正规范中可写

{{< reader-math "block" >}}\Phi(x)=\frac{1}{\sqrt2}
\begin{pmatrix}
0\\ v+H(x)
\end{pmatrix}.{{< /reader-math >}}

{{< reader-math "inline" >}}H(x){{< /reader-math >}} 就是可观测的 希格斯 玻色子场涨落。这里最重要的观念是：**希格斯 机制不是“粒子从 希格斯 场吸收一份能量，才被创造出来”**。它改变的是基态周围激发的动力学方程，使拉格朗日量中出现质量项。

## 4.3 {{< reader-math "inline" >}}W{{< /reader-math >}} 和 {{< reader-math "inline" >}}Z{{< /reader-math >}} 如何获得质量

希格斯 场的协变导数项

{{< reader-math "block" >}}(D_\mu\Phi)^\dagger(D^\mu\Phi){{< /reader-math >}}

在 {{< reader-math "inline" >}}\Phi{{< /reader-math >}} 围绕非零 {{< reader-math "inline" >}}v{{< /reader-math >}} 展开后产生

{{< reader-math "block" >}}m_W=\frac{gv}{2},{{< /reader-math >}}

{{< reader-math "block" >}}m_Z=\frac{v}{2}\sqrt{g^2+g'^2}.{{< /reader-math >}}

弱混合角满足

{{< reader-math "block" >}}\tan\theta_W=\frac{g'}{g},{{< /reader-math >}}

光子场和 {{< reader-math "inline" >}}Z{{< /reader-math >}} 场由中性规范场混合得到：

{{< reader-math "block" >}}A_\mu=B_\mu\cos\theta_W+W^3_\mu\sin\theta_W,{{< /reader-math >}}

{{< reader-math "block" >}}Z_\mu=-B_\mu\sin\theta_W+W^3_\mu\cos\theta_W.{{< /reader-math >}}

未破缺的 {{< reader-math "inline" >}}U(1)_{\mathrm{EM}}{{< /reader-math >}} 保证光子保持无质量。[A Model of Leptons (1967)](https://doi.org/10.1103/PhysRevLett.19.1264) · [Electroweak Model and Constraints on New Physics (2025)](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-standard-model.pdf)

{{< reader-figure "original/electroweak_breaking_zh.png" "电弱对称性破缺后的物理场。" >}}

## 4.4 费米子质量与 汤川 耦合

以一个费米子 {{< reader-math "inline" >}}f{{< /reader-math >}} 为例，汤川 相互作用可示意写为

{{< reader-math "block" >}}\mathcal L_Y=-y_f\,\bar f_L\Phi f_R+\mathrm{h.c.}{{< /reader-math >}}

电弱对称性破缺后给出

{{< reader-math "block" >}}m_f=\frac{y_fv}{\sqrt2}.{{< /reader-math >}}

因此“电子质量来自 希格斯”更精确的意思是：电子与 希格斯 场存在 汤川 耦合，而 希格斯 场的非零真空期望值把这个耦合转化为电子质量项。电子 汤川 耦合极小，约 {{< reader-math "inline" >}}y_e\sim2.9\times10^{-6}{{< /reader-math >}}；顶夸克 汤川 耦合则接近 1。为什么这些无量纲耦合跨越如此大的范围，标准模型并没有给出更深解释。[Higgs Boson Physics, Status of (2025)](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-higgs-boson.pdf) · [Review of Particle Physics (2026)](https://pdg.lbl.gov/2026/)

## 4.5 中微子怎么办？

最小标准模型没有右手中微子，因此中微子在该最小版本中是无质量的；但中微子振荡实验已经证明至少两个中微子质量本征态非零。由此可知真实自然界需要超出最小标准模型的中微子质量机制，例如 Dirac 质量、Majorana 质量、seesaw 等可能性。[Review of Particle Physics (2026)](https://pdg.lbl.gov/2026/)

## 4.6 希格斯 玻色子的发现

2012 年 7 月，ATLAS 和 CMS 在 LHC 数据中分别报告约 125 GeV 新玻色子的显著信号；随后对自旋、宇称和耦合的测量使其与标准模型 希格斯 玻色子相容。[Observation of a new particle in the search for the Standard Model Higgs boson with the ATLAS detector at the LHC (2012)](https://doi.org/10.1016/j.physletb.2012.08.020) · [Observation of a new boson at a mass of 125 GeV with the CMS experiment at the LHC (2012)](https://doi.org/10.1016/j.physletb.2012.08.021) · [Higgs Boson Physics, Status of (2025)](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-higgs-boson.pdf)



**算例。** 取 v=246.22 GeV、电子静能 0.51099895069 MeV，树级估算 yₑ=√2mₑ/v≈2.94×10⁻⁶。这个很小的无量纲数是耦合，不是一份能量。

[目录]({{< relref "books/mass-light/_index.md" >}}) · [上一章](../mass/) · [下一章](../qcd/)
