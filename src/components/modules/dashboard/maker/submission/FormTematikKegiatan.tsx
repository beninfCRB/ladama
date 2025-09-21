import CustomTablist from "@/components/custom-ui/CustomTablist";
import { FormField, FormMessage } from "@/components/ui/form";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import type { submissionFormReturnType } from "@/schemas/submission.schema";
import { useSubtematikKegiatan } from "@/stores/subtematikKegiatan";
import { useTematikKegiatan } from "@/stores/tematikKegiatan.store";

interface FormTematikKegiatanProps {
  form: submissionFormReturnType;
  imgUrls: Array<string>;
  setActiveTab: (value: string) => void;
}

function FormTematikKegiatan({
  form,
  imgUrls,
  setActiveTab,
}: FormTematikKegiatanProps) {
  const tematik = useTematikKegiatan().useGlobalStore(
    (s) => s["tematikKegiatanData"]
  );
  const { createMutation: createSubTematik } = useSubtematikKegiatan();
  const fetchSubtematik = async (id: string) => {
    await createSubTematik?.mutate({ tematik_kegiatan_id: id });
  };

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
          PILIH TEMA
        </h3>
        <p className="text-sm text-shadow-white">
          Pilih tema yang anda ingin ajukan
        </p>
      </div>
      <CustomTablist />

      <FormField
        control={form.control}
        name="tematik_kegiatan_id"
        render={({ field }) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tematik?.data && tematik?.data?.length > 0 ? (
              tematik?.data?.map((theme, index) => (
                <label key={theme.id} className="cursor-pointer group">
                  <input
                    type="radio"
                    value={theme.id}
                    checked={field.value === theme.id}
                    onChange={() => {}}
                    onClick={() =>
                      handleSelect(theme.id, field.onChange, "subtematik", () =>
                        fetchSubtematik(theme.id)
                      )
                    }
                    className="peer hidden"
                  />
                  <div
                    className="h-full border border-border rounded-xl p-6 transition-all duration-300 bg-card 
                              peer-checked:border-amber-400 peer-checked:ring-2 peer-checked:ring-amber-400
                              group-hover:scale-105 group-hover:shadow-lg flex flex-col gap-4 items-center"
                  >
                    <img
                      src={imgUrls[index]}
                      alt="tema"
                      className="w-20 h-20 rounded-lg object-cover border border-border"
                    />
                    <h4 className="font-semibold text-card-foreground text-base text-center">
                      {theme.tematik_kegiatan}
                    </h4>
                    <p className="text-sm text-muted-foreground text-center">
                      {theme.deskripsi_tematik}
                    </p>
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

export default FormTematikKegiatan;
