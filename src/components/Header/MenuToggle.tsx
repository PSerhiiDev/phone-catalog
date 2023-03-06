import clsx from "clsx";
import { motion } from "framer-motion";
import styles from './Header.module.scss';

type Props = {
  toggle: ()=> void
  isOpen: boolean
}

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeLinecap="round"
    strokeWidth="3"
    {...props}
  />
);

const transition = { duration: 0.33 };

export function MenuToggle({ toggle, isOpen }: Props) {
  return (
    <button onClick={toggle} className={styles.hamburgerBtn} 
    // className={clsx(styles.hamburgerBtn, isOpen && '')} 
    // style={`background: ${isOpen ? "" : ""}`}
    style={{background: isOpen ? "transparent" : "inherit"}}
    >
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          animate={isOpen ? "open" : "closed"}
          initial={false}
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5", stroke: "hsl(0, 0%, 18%)" },
            open: { d: "M 3 16.5 L 17 2.5", stroke: "#fff" },
          }}
          transition={transition}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          stroke="hsl(0, 0%, 18%)"
          animate={isOpen ? "open" : "closed"}
          initial={false}
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={transition}
        />
        <Path
          animate={isOpen ? "open" : "closed"}
          initial={false}
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346", stroke: "hsl(0, 0%, 18%)" },
            open: { d: "M 3 2.5 L 17 16.346", stroke: "#fff" },
          }}
          transition={transition}
        />
      </svg>
    </button>
  );
}