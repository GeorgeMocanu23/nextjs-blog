import { Typography } from '@mui/material'
import styles from '../../styles/WellcomeMsg.module.css'

function WellcomeMsg({ userStatus }) {

	return (
		<Typography
			variant="h4"
			className={styles.neonText}
			style={{ marginBottom: '40px', whiteSpace: 'pre-line' }}
		>
			Welcome
			{userStatus ?
				`, ${userStatus?.user?.name}!\nExplore my wonders.` :
				` to my Portofolio!`
			}
		</Typography>
	)
}

export default WellcomeMsg