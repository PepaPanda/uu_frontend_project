import { useEffect } from "react";

//Helpers
import { fetchShoppingListMultiple } from "../../../helpers/fetchShoppingListMultiple";
import { toast } from "react-toastify";
import { truncate } from "../../../helpers/utils";

//Context
import { useShoppingListMultiple } from "../../../context/ShoppingListMultiple/useShoppingListMultiple";
import { useUser } from "../../../context/UserContext/useUser";

//Charts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

//Languages
import { useLanguage } from "../../../context/LanguageContext/useLanguage";
import { resolveTranslationString } from "../../../helpers/resolveTranslationString";

const Stats = () => {
  const { language } = useLanguage();

  const { user } = useUser();
  const { shoppingListMultiple, setShoppingListMultiple } =
    useShoppingListMultiple();

  useEffect(() => {
    if (!user?._id) return;
    if (shoppingListMultiple) return;

    (async () => {
      const list = await fetchShoppingListMultiple(user._id);
      if (!list)
        return toast(
          resolveTranslationString("failed to get shopping list", language)
        );
      setShoppingListMultiple(list);
    })();
  }, [user, setShoppingListMultiple, shoppingListMultiple]);

  const chartData = shoppingListMultiple?.map((list) => {
    return {
      name: truncate(list.name, 13),
      resolved: list.items.filter((item) => item.resolved).length,
      unresolved: list.items.filter((item) => !item.resolved).length,
      id: list._id,
    };
  });

  const handleClickChart = (data: any) => {
    const item = data.payload;
    window.location.href = `/shopping-list/${item.id}`;
  };

  return (
    <div>
      <BarChart
        style={{
          width: "100%",
          maxHeight: "70vh",
          aspectRatio: 1.618,
          cursor: "pointer",
        }}
        responsive
        data={chartData}
        margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" cursor="default" />
        <XAxis dataKey="name" fontSize="0.7rem" cursor="default" />
        <YAxis width="auto" />
        <Tooltip />
        <Legend cursor="default" />
        <Bar
          dataKey="resolved"
          stackId="a"
          fill="#8884d8"
          background
          onClick={handleClickChart}
          cursor="pointer"
          name={resolveTranslationString("resolved", language)}
        />
        <Bar
          dataKey="unresolved"
          stackId="a"
          fill="#82ca9d"
          background
          onClick={handleClickChart}
          cursor="pointer"
          name={resolveTranslationString("unresolved", language)}
        />
      </BarChart>
    </div>
  );
};

export default Stats;
