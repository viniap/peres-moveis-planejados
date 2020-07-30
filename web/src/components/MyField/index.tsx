import React from 'react';
import { useFormikContext, useField } from 'formik';
import ViaCEP from '../../services/ViaCEP';

interface MyFieldProps {
    name: string;
    type: string;
    id: string;
    className: string;
}

interface Form {
    cep: string;
}

interface ViaCEPResponse {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    unidade: string;
    ibge: string;
    gia: string;
}

async function fetchNewAddress(cep: string) {
    const response = await ViaCEP.get(`${cep}/json`);
    return response;
}

const MyField: React.FC<MyFieldProps> = (props) => {
    const {
        values,
        /*touched,*/
        setFieldValue,
    } = useFormikContext<Form>();

    const [field] = useField(props);
    const isInitialMount = React.useRef(true);
    
    React.useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            let isCurrent = true;

            if(values.cep !== undefined){
                if (values.cep.length === 8) {
                    fetchNewAddress(values.cep).then(result => {
                        if (!!isCurrent) {
                            // prevent setting old values
                            setFieldValue(props.name, result.data[props.name]);
                        }
                    });
                }
            }
        }
    }, [values.cep, setFieldValue, props.name]);
    
      return (
        <input {...props} {...field} />
      );
}

export default MyField;