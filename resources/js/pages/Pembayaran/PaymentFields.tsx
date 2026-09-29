import { fieldClass, FormField } from '@/components/form-field';

export interface PembayaranFormData {
    jumlah: string;
    tanggal_pembayaran: string;
    metode_pembayaran: string;
}

interface PaymentFieldsProps {
    data: PembayaranFormData;
    /** Kirim satu field per perubahan; setData(key, value) tidak mengganti field lain. */
    onChange: (field: keyof PembayaranFormData, value: string) => void;
    errors: Partial<Record<keyof PembayaranFormData, string>>;
}

export function PaymentFields({ data, onChange, errors }: PaymentFieldsProps) {
    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField
                label="Metode Pembayaran"
                error={errors.metode_pembayaran}
            >
                <select
                    value={data.metode_pembayaran}
                    onChange={(event) =>
                        onChange('metode_pembayaran', event.target.value)
                    }
                    className={fieldClass}
                >
                    <option value="Cash">Cash</option>
                    <option value="Bank">Bank</option>
                </select>
            </FormField>
            <FormField label="Jumlah Tagihan (Rp)" error={errors.jumlah}>
                <input
                    type="number"
                    min="0"
                    value={data.jumlah}
                    readOnly
                    className={fieldClass}
                />
            </FormField>
            <FormField
                label="Tanggal Pembayaran"
                error={errors.tanggal_pembayaran}
            >
                <input
                    type="datetime-local"
                    value={data.tanggal_pembayaran}
                    onChange={(event) =>
                        onChange('tanggal_pembayaran', event.target.value)
                    }
                    className={fieldClass}
                />
            </FormField>
        </div>
    );
}
