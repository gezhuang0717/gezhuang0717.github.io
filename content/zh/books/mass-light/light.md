---
title: 8. 光是什么？从光线到麦克斯韦
date: '2026-10-08T00:00:00+03:00'
weight: 8
showPagination: false
description: 波振幅可以有正负或复数相位；强度与振幅模平方成正比。相干振幅先相加再取平方，独立强度在平均后相加。折射定律中的角度从界面法线量起。下文无源真空方程假定没有电荷和电流。
---

## 从振幅到强度

波振幅可以有正负或复数相位；强度与振幅模平方成正比。相干振幅先相加再取平方，独立强度在平均后相加。折射定律中的角度从界面法线量起。下文无源真空方程假定没有电荷和电流。


{{< reader-figure "original/em_spectrum_zh.png" "电磁谱：可见光只是很窄的一段。" >}}

## 8.1 第一层：几何光学中的光线

在波长远小于器件或障碍物尺度时，光可近似沿射线传播。反射定律

{{< reader-math "block" >}}\theta_i=\theta_r{{< /reader-math >}}

和 Snell 折射定律

{{< reader-math "block" >}}n_1\sin\theta_1=n_2\sin\theta_2{{< /reader-math >}}

都能从费马原理或波动光学的短波极限推出。光“近似直线传播”因此并不能证明它是经典小硬球。

## 8.2 第二层：干涉与衍射

Young 的双缝实验是波动光学史上的关键证据之一。两个相干波的强度满足

{{< reader-math "block" >}}I=I_1+I_2+2\sqrt{I_1I_2}\cos\delta.{{< /reader-math >}}

在远场近似下，双缝亮纹间距

{{< reader-math "block" >}}\Delta y\simeq\frac{\lambda L}{d},{{< /reader-math >}}

其中 {{< reader-math "inline" >}}d{{< /reader-math >}} 是缝间距，{{< reader-math "inline" >}}L{{< /reader-math >}} 为屏距。[The Bakerian Lecture: On the theory of light and colours (1802)](https://doi.org/10.1098/rstl.1802.0004)

{{< reader-figure "original/double_slit_zh.png" "双缝干涉的几何关系。" >}}

## 8.3 第三层：麦克斯韦的电磁波

真空中的麦克斯韦方程为

{{< reader-math "block" >}}\nabla\cdot\mathbf E=0,\qquad
\nabla\cdot\mathbf B=0,{{< /reader-math >}}

{{< reader-math "block" >}}\nabla\times\mathbf E=-\frac{\partial\mathbf B}{\partial t},{{< /reader-math >}}

{{< reader-math "block" >}}\nabla\times\mathbf B=
\mu_0\epsilon_0\frac{\partial\mathbf E}{\partial t}.{{< /reader-math >}}

由此得到波动方程

{{< reader-math "block" >}}\nabla^2\mathbf E-
\mu_0\epsilon_0\frac{\partial^2\mathbf E}{\partial t^2}=0,{{< /reader-math >}}

传播速度满足

{{< reader-math "block" >}}c=\frac{1}{\sqrt{\mu_0\epsilon_0}}{{< /reader-math >}}

在经典 SI 表述下成立。麦克斯韦由电磁常数与已知光速的一致性认识到光是电磁现象。[A Dynamical Theory of the Electromagnetic Field (1865)](https://doi.org/10.1098/rstl.1865.0008)

平面波中

{{< reader-math "block" >}}\mathbf B=\frac{1}{c}\hat{\mathbf k}\times\mathbf E,{{< /reader-math >}}

能流由 Poynting 向量描述：

{{< reader-math "block" >}}\mathbf S=\frac{1}{\mu_0}\mathbf E\times\mathbf B.{{< /reader-math >}}

## 8.4 以太与 Michelson--Morley 实验

19 世纪曾普遍设想电磁波需要某种“发光以太”作为机械介质。Michelson--Morley 1887 年的干涉实验没有发现经典静止以太模型预期的以太风信号。[On the Relative Motion of the Earth and the Luminiferous Ether (1887)](https://doi.org/10.2475/ajs.s3-34.203.333)

历史上不能简单说“一次实验就证明以太不存在”；Lorentz 等人在此后还发展了更复杂的框架。真正系统地改变时空观的是 1905 年狭义相对论：物理规律在惯性系中具有相同形式，真空光速 {{< reader-math "inline" >}}c{{< /reader-math >}} 对所有惯性观察者相同。[Zur Elektrodynamik bewegter K\"orper (1905)](https://doi.org/10.1002/andp.19053221004)



[目录]({{< relref "books/mass-light/_index.md" >}}) · [上一章](../early-universe/) · [下一章](../photons/)
