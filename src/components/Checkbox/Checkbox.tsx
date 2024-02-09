import React from 'react';

interface CheckboxProps extends React.ComponentPropsWithoutRef<'input'> {
    isIndeterminate?: boolean;
    // label: string;
}
  
export const Checkbox: React.FC<CheckboxProps> = ({isIndeterminate, ...restProps}) => {
    const checkboxRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (!checkboxRef.current) {
            return;
        }
        
        if (isIndeterminate) {
            checkboxRef.current.indeterminate = true;
            checkboxRef.current.checked = false;
        } else {
            checkboxRef.current.indeterminate = false;
        }
    },[isIndeterminate]);

    return <input ref={checkboxRef} type="checkbox" {...restProps}/>
}
