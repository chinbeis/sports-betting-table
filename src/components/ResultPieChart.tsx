"use client";

import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";

interface ResultPieChartProps {
  data: { name: string; value: number }[];
}

export function ResultPieChart({ data }: ResultPieChartProps) {
  useLayoutEffect(() => {
    const root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "name",
      })
    );

    series.data.setAll(data);

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      })
    );

    legend.data.setAll(series.dataItems);

    return () => {
      root.dispose();
    };
  }, [data]);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
}
