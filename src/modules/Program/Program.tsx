import { useCallback, MouseEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import GridItem from "@mui/material/Grid"
import Pagination from "@mui/material/Pagination"
import Box from "@mui/material/Box"
import { Card } from 'components/Card'
import { Grid } from 'components/Grid'
import { DetailModal } from './components/Detail'
import { getFact } from 'store/slices/modal'
import type { DataRecord } from 'types'

type ProgramModuleProps = {
	data: DataRecord[];
	total: number;
	page: number;
}


const ProgramModule = ({ data, total, page }: ProgramModuleProps) => {
	const dispatch = useDispatch()
	const { push, query } = useRouter()

	const onNavigate = useCallback(async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		if (e.currentTarget?.dataset?.identificator) {
			dispatch(getFact(e.currentTarget?.dataset?.identificator))
		}
	}, [dispatch])

	const onPageChange = useCallback((_: ChangeEvent<unknown>, page: number) => {
		push(`/programType/${query.programType}?page=${page}`)
	}, [push, query.programType])

	return (
		<>
			<Grid>
				{data.map((record) => (
					<GridItem key={record.title} item xs={12} md={5} lg={3} >
						<Card
							id={record.releaseYear}
							title={record.title}
							perex={record.description}
							image={record?.images?.['Poster Art']?.url}
							onClick={onNavigate}
						/>
					</GridItem>
				))}
			</Grid>
			<Box display="flex" justifyContent="center" p={4}>
				<Pagination count={Math.ceil(total / 10)} page={page} onChange={onPageChange} />
			</Box>
			<DetailModal />
		</>
	)
}

export default ProgramModule