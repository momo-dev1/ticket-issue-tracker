'use client'
import React from 'react'
import { TableHead as TableHd } from './ui/table'
import { ArrowDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ISearchParamsProps } from '@/app/page'

interface IProps {
  searchParams: ISearchParamsProps
  name: string
  orderBy: string
}
const TableHead = ({ searchParams, name, orderBy }: IProps) => {
  const router = useRouter()

  const setOrderBy = (field: string) => {
    const stringParams: Record<string, string> = {}
    for (const [key, value] of Object.entries(searchParams)) {
      stringParams[key] = String(value)
    }
    const newParams = new URLSearchParams(stringParams)
    if (searchParams.orderBy === field) {
      newParams.delete('orderBy')
    } else {
      newParams.set('orderBy', field)
    }
    router.push('/?' + newParams.toString())
  }

  return (
    <TableHd>
      <button onClick={() => setOrderBy(orderBy)}>{name}</button>
      {searchParams?.orderBy === `${orderBy}` && (
        <ArrowDown className='inline p-1' />
      )}
    </TableHd>
  )
}

export default TableHead
