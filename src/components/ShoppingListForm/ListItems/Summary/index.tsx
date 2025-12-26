import Box from "../../../../ui_components/Box";

import { Pie, PieChart, Cell } from "recharts";

//Languages
import { useLanguage } from "../../../../context/LanguageContext/useLanguage";
import { resolveTranslationString } from "../../../../helpers/resolveTranslationString";

const Summary = ({
  unresolvedItemsCount = 0,
  resolvedItemsCount = 0,
}: {
  unresolvedItemsCount?: number;
  resolvedItemsCount?: number;
}) => {
  const { language } = useLanguage();

  const data = [
    { name: "Resolved", value: resolvedItemsCount },
    { name: "Unresolved", value: unresolvedItemsCount },
  ];

  const totalValue = unresolvedItemsCount + resolvedItemsCount;

  const COLORS = ["#00C49F", "#FFBB28"];

  return (
    <>
      <Box justify="space-between">
        <div></div>
        <Box direction="column-reverse">
          <Box justify="space-between">
            <div></div>
            <PieChart width={100} height={100}>
              <Pie data={data} dataKey="value" cx="50%" cy="50%">
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </Box>
          <Box direction="column" gap="2px" align="flex-end" padding="12px 0">
            <span style={{ fontWeight: "bold" }}>
              {totalValue}{" "}
              {totalValue >= 5 || totalValue === 0
                ? resolveTranslationString("items_count_over4", language)
                : totalValue === 1
                ? resolveTranslationString("items_count_unit", language)
                : resolveTranslationString("items", language)}
            </span>
            <Box direction="row" gap="6px">
              <span style={{ color: COLORS[0] }}>
                {resolvedItemsCount}{" "}
                {resolvedItemsCount >= 5 || resolvedItemsCount === 0
                  ? resolveTranslationString("resolved_count_over4", language)
                  : resolvedItemsCount === 1
                  ? resolveTranslationString("resolved_count_unit", language)
                  : resolveTranslationString("resolved", language)}
              </span>
              <span style={{ color: COLORS[1] }}>
                {unresolvedItemsCount}{" "}
                {unresolvedItemsCount >= 5 || unresolvedItemsCount === 0
                  ? resolveTranslationString("unresolved_count_over4", language)
                  : unresolvedItemsCount === 1
                  ? resolveTranslationString("unresolved_count_unit", language)
                  : resolveTranslationString("unresolved", language)}
              </span>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Summary;
