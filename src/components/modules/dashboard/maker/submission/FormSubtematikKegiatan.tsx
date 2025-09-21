import CustomTablist from "@/components/custom-ui/CustomTablist";
import { FormField, FormMessage } from "@/components/ui/form";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import type { submissionFormReturnType } from "@/schemas/submission.schema";
import { useSubtematikKegiatan } from "@/stores/subtematikKegiatan";

interface FormSubtematikKegiatanProps {
  form: submissionFormReturnType;
  imgUrls2: Array<string>;
  setActiveTab: (value: string) => void;
}

function FormSubtematikKegiatan({
  form,
  imgUrls2,
  setActiveTab,
}: FormSubtematikKegiatanProps) {
  const subTematik = useSubtematikKegiatan().useGlobalStore(
    (s) => s["subTematikKegiatanData"]
  );

  const handleSelect = (
    value: string,
    fieldOnChange: (val: string) => void,
    nextTab?: string,
    callback?: () => void
  ) => {
    fieldOnChange(value);
    if (nextTab) setActiveTab(nextTab);
    if (callback) callback();
  };

  return (
    <>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-shadow-white mb-2">
          PILIH SUB TEMA
        </h3>
        <p className="text-sm text-shadow-white">
          Pilih sub tema yang anda ingin ajukan
        </p>
      </div>
      <CustomTablist />

      <FormField
        control={form.control}
        name="subtematik_kegiatan_id"
        render={({ field }) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subTematik?.data && subTematik?.data?.length > 0 ? (
              subTematik?.data?.map((sub, index) => (
                <label key={sub.id} className="cursor-pointer group">
                  <input
                    type="radio"
                    value={sub.id}
                    checked={field.value === sub.id}
                    onChange={() => {}}
                    onClick={() =>
                      handleSelect(sub.id, field.onChange, "kegiatan")
                    }
                    className="peer hidden"
                  />

                  <div
                    className="h-full border border-border rounded-xl p-6 transition-all duration-300 bg-card 
                              peer-checked:border-amber-400 peer-checked:ring-2 peer-checked:ring-amber-400
                              group-hover:scale-105 group-hover:shadow-lg flex flex-col gap-4 items-center"
                  >
                    <img
                      src={imgUrls2[index]}
                      alt="subtematik"
                      className="w-20 h-20 rounded-lg object-cover border border-border"
                    />
                    <h4 className="font-semibold text-card-foreground text-base text-center">
                      {sub.sub_tematik_kegiatan}
                    </h4>
                  </div>
                </label>
              ))
            ) : (
              <div className="col-span-3 flex justify-center">
                <Spinner />
              </div>
            )}
          </div>
        )}
      />
      <FormMessage />
    </>
  );
}

export default FormSubtematikKegiatan;
