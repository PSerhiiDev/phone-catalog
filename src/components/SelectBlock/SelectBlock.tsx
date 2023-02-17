import React, { useState } from 'react'
import Select, { StylesConfig, GroupBase, ActionMeta, OnChangeValue } from 'react-select'
import styles from './SelectBlock.module.scss';

type Props = {
  title: string
  items: string[]
  value?: string
  selectedItem?: string | number
onChangeHandler?: (
    value: OnChangeValue<OptionsList, IsMulti>,
    label: ActionMeta<OptionsList>
  ) => void;
}

type IsMulti = false;

interface OptionsList {
  value: string,
  label: string,
}


const SelectBlock: React.FC<Props> = ({title, items, onChangeHandler, value, selectedItem}) => {
 

  const selectItems = items.map(item => {
    return {
      value: item,
      label: item
    }
  });


  const customStyles: StylesConfig<OptionsList, IsMulti> = {           
   
    option:  (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#fafbfc" : 'inherit',
        color: isFocused ? "#313237" : "#89939a",
        cursor: isFocused ? 'pointer' : 'default',
      };
    }
  };


  return (
    <div className={styles.select}>
      <p className={styles.title}>
        {title}
      </p>

      <Select
      onChange={onChangeHandler}
      options={selectItems} 
      styles={customStyles}
      />

    </div>
  )
}

export default SelectBlock;