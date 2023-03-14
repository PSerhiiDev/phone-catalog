import clsx from 'clsx';
import React from 'react'
import styles from './TechSpecs.module.scss';

interface TechSpec {
  key: string;
  value: string | undefined;
}

type Props = {
  techSpecs: TechSpec[];
  isTextSmall: boolean;
};

const TechSpecs: React.FC<Props> = ({ techSpecs, isTextSmall }) => {
  return (
    <div className={clsx(styles['techSpecks-block'], {
      [styles.smallText]: isTextSmall,
    })}
    >
      {techSpecs.map(techSpec => (
        <div key={techSpec.key} className={styles.item}>
          {techSpec.key}

          <span className={styles.value}>
            {techSpec.value ? techSpec.value : 'N/A'}
          </span>
        </div>
      ))}
    </div>
  )
}

export default TechSpecs