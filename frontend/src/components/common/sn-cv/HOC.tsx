import { Button, Icon, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ArrowIcon } from "components/icons";
import { ThemeProps } from "models/types";
import React, {
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";

const HOC = ({ children }: HOCProps) => {
  const [rows, setRows] = useState<any[]>([]);

  const handlePlus = () => {
    setRows((pre) => {
      let newRows: any[] = [...pre];

      const total = pre.map((e) => Number(e.key));
      const numberArr = checkMissingNumber(total);

      newRows.push(
        <Row
          onPlus={handlePlus}
          onRemove={handleRemove}
          key={numberArr[0] === undefined ? pre.length : numberArr[0]}
          onClickDown={handleDow}
          onClickUp={handleUp}
          index={numberArr[0] === undefined ? pre.length : numberArr[0]}
        >
          {children}
        </Row>
      );

      return [...newRows];
    });
  };

  const handleRemove = (index: number) => {
    setRows((pre) => {
      let newRows: any[] = [...pre];
      const total = pre.length;

      if (total < 2) return newRows;
      if (total === 2) {
        return [
          <Row
            onPlus={handlePlus}
            onRemove={handleRemove}
            key={0}
            onClickDown={handleDow}
            onClickUp={handleUp}
            index={0}
          >
            {children}
          </Row>,
        ];
      }
      newRows = pre.filter((e) => e.key != index);

      return [...newRows];
    });
  };

  const handleDow = (index: number) => {
    setRows((pre) => {
      const id = pre.findIndex((e) => e.key == index);
      if (id === pre.length - 1) return [...pre];

      let el = pre[id];
      pre[id] = pre[id + 1];
      pre[id + 1] = el;

      return [...pre];
    });
  };

  const handleUp = (index: number) => {
    setRows((pre) => {
      const id = pre.findIndex((e) => e.key == index);
      if (id === 0) return [...pre];

      let el = pre[id];
      pre[id] = pre[id - 1];
      pre[id - 1] = el;

      return [...pre];
    });
  };

  const firstLoad = () => {
    const newRows: any[] = [...rows];

    newRows.push(
      <Row
        onPlus={handlePlus}
        onRemove={handleRemove}
        key={0}
        onClickDown={handleDow}
        onClickUp={handleUp}
        index={0}
      >
        {children}
      </Row>
    );

    setRows([...newRows]);
  };

  useEffect(() => {
    firstLoad();
  }, []);

  return <div>{rows}</div>;
};

type HOCProps = {
  children: ReactNode;
};

export default HOC;

const Row = ({
  onPlus,
  onRemove,
  onClickDown,
  onClickUp,
  children,
  index,
}: RowProps) => {
  const classes = useStyles();

  const [isHover, setIsHover] = useState(false);

  const handleMouseOver = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsHover(true);
  };
  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsHover(false);
  };

  return (
    <div
      onMouseLeave={handleMouseLeave}
      onMouseOver={handleMouseOver}
      id="wrapper"
    >
      <div className={clsx(classes.root, isHover && classes.border)}>
        {isHover && (
          <div className={classes.action}>
            <IconButton
              onClick={() => onClickUp(index)}
              size="small"
              className={classes.iconButton}
            >
              <ArrowIcon sx={{ transform: "rotate(180deg)" }} />
            </IconButton>
            <IconButton
              size="small"
              className={classes.iconButton}
              onClick={() => onClickDown(index)}
            >
              <ArrowIcon />
            </IconButton>
            <Button
              className={classes.add}
              variant="contained"
              onClick={onPlus}
            >
              Thêm
            </Button>
            <Button
              className={classes.remove}
              variant="contained"
              onClick={() => onRemove(index)}
            >
              Xoá
            </Button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

type RowProps = {
  index: number;
  onPlus: (e: any) => void;
  onRemove: (e: any) => void;
  onClickUp: (e: any) => void;
  onClickDown: (index: number) => void;
  children: ReactNode;
};

Row.displayName = "row";

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    border: "1px solid transparent",
  },
  border: {
    position: "relative",
    border: `1px solid black`,
    borderRadius: 4,
  },
  add: {
    "&,&:hover": {
      backgroundColor: theme.palette.success.main,
      fontSize: 8,
      fontWeight: 500,
      minWidth: 40,
      lineHeight: "12px",
      padding: "2px 8px",
    },
  },
  remove: {
    "&,&:hover": {
      backgroundColor: theme.palette.error.main,
      fontSize: 8,
      fontWeight: 500,
      minWidth: 40,
      lineHeight: "12px",
      padding: "2px 8px",
    },
  },
  action: {
    stroke: "black",
    position: "absolute",
    top: 0,
    transform: "translateY(-100%)",
  },
  iconButton: {
    "&:hover": {
      backgroundColor: "white",
    },
    backgroundColor: "white",
    borderRadius: 4,
    fontSize: 12,
    padding: "2px 8px",
  },
}));

const checkMissingNumber = (array: any[]) => {
  const max = Math.max(...array); // Will find highest number
  const min = 0;
  const missing:any[] = [];

  for (let i = min; i <= max; i++) {
    if (!array.includes(i)) {
      // Checking whether i(current value) present in num(argument)
      missing.push(i); // Adding numbers which are not in num(argument) array
    }
  }
  return missing;
};
