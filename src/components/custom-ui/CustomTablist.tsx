import { tabsvalue } from "@/types/static";
import { TabsList, TabsTrigger } from "../ui/tabs";

function CustomTablist() {
  return (
    <div className="flex flex-col items-center gap-2 mb-4">
      <TabsList className="bg-white/20 backdrop-blur-md p-1 rounded-lg flex flex-wrap gap-2 mb-8">
        {tabsvalue.map((item, index) => (
          <TabsTrigger
            key={index}
            value={item}
            className="flex-1 text-white data-[state=active]:bg-white data-[state=active]:text-black px-4 py-2 rounded-md"
          >
            {item.toUpperCase()}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
}

export default CustomTablist;
