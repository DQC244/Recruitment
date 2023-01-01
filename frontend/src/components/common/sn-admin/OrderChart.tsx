import React, { useEffect, useMemo, useState } from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { Box } from "@mui/material";
import theme from "public/material";
import { AdminService } from "services";
import { ApiConstant } from "const";
import dayjs from "dayjs";

const OrderChart = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip
  );

  const classes = useStyles();

  const [stats, setStats] = useState<any>([]);

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const { labelList, dataList } = useMemo(() => {
    let labelList: any[] = [];
    let dataList: any[] = [];
    stats?.map((item: any) => {
      labelList = [...labelList, labels[item._id - 1]];
      dataList = [...dataList, item.total];
    });

    return { labelList, dataList };
  }, [stats]);

  const getStatsOrder = async () => {
    try {
      const res: any = await AdminService.getIncome();
      if (res.status === ApiConstant.STT_OK) {
        setStats(res.data);
      }
    } catch (error) {}
  };

  const data = useMemo(() => {
    return {
      labels: labelList,
      datasets: [
        {
          label: "total",
          data: dataList,
          borderColor: theme.palette.primary.main,
          backgroundColor: theme.palette.primary.light,
        },
      ],
    };
  }, [labelList, dataList]);

  useEffect(() => {
    getStatsOrder();
  }, []);


  return (
    <Box className={classes.root}>
      <Line data={data} />
    </Box>
  );
};

export default OrderChart;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    width: 600,
  },
}));
