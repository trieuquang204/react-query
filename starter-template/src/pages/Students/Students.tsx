import { getStudents } from 'apis/students.api'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Students as StudentsType } from 'types/students.types';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { useQueryString } from 'utils/getParamsObject';

import classNames from 'classnames';

const LIMIT = 10

export default function Students() {
  // c1

  // const [students, setStudents] = useState<StudentsType>([])
  // const [isLoading, setIsLoading] = useState<boolean>(false)


  // useEffect(() => {
  //   setIsLoading(true)
  //   getStudents(1, 5).then(res => {
  //     setStudents(res.data)
  //   }).finally(() => {
  //     setIsLoading(false)
  //   })
  // }, [])

  // c2: 

  const queryString: any = useQueryString()
  const page = Number(queryString.page) || 1

  console.log('queryString', queryString)
  

  const {data, isLoading} = useQuery({
    queryKey: ['students', page],
    queryFn: () => getStudents(page, LIMIT)
  })

  const totalStudents = Number(data?.headers['x-total-count']) || 0
  const totalPage = Math.ceil( totalStudents / LIMIT)

  // 3: 

  // const queryString: any = useQueryString()
  // const [_page] = useState(1)
  

  // const {data, isLoading} = useQuery({
  //   queryKey: ['students', _page],
  //   queryFn: () => getStudents(_page, 10)
  // })


  return (
    <div>
      <h1 className='text-lg'>Students</h1>
      { isLoading && (
        <div role='status' className='mt-6 animate-pulse'>
        <div className='mb-4 h-4  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <div className='h-10  rounded bg-gray-200 dark:bg-gray-700' />
        <span className='sr-only'>Loading...</span>
      </div>
      )}
      <div className='relative mt-6 overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
          <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='py-3 px-6'>
                #
              </th>
              <th scope='col' className='py-3 px-6'>
                Avatar
              </th>
              <th scope='col' className='py-3 px-6'>
                Name
              </th>
              <th scope='col' className='py-3 px-6'>
                Email
              </th>
              <th scope='col' className='py-3 px-6'>
                <span className='sr-only'>Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((item) => (
              <tr key={item.id} className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'>
              <td className='py-4 px-6'>{item.id}</td>
              <td className='py-4 px-6'>
                <img
                  src={item.avatar}
                  alt='student'
                  className='h-5 w-5'
                />
              </td>
              <th scope='row' className='whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white'>
                {item.last_name}
              </th>
              <td className='py-4 px-6'>{item.email}</td>
              <td className='py-4 px-6 text-right'>
                <Link to='/students/1' className='mr-5 font-medium text-blue-600 hover:underline dark:text-blue-500'>
                  Edit
                </Link>
                <button className='font-medium text-red-600 dark:text-red-500'>Delete</button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='mt-6 flex justify-center'>
        <nav aria-label='Page navigation example'>
          <ul className='inline-flex -space-x-px'>
          <li>
            {page === 1 ? (
                <span className='cursor-not-allowed rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 '>
                  Previous
                </span>
              ) : (
                <Link
                  className='rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 '
                  to={`/students?page=${page - 1}`}
                >
                  Previous
                </Link>
              )}
            </li>

            {Array(totalPage).fill(0).map((_, index) => {
              return (
                <li key={index}>
                <Link
                  // className='border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                  className={classNames('border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700', {
                    'testActive' : (page === index + 1),
                  })}
                  to={`/students?page=${index + 1}`}
                >
                  {index + 1}
                </Link>
              </li>
              )
            })}
            <li>
              {page === totalPage ? (
                <span className='cursor-not-allowed rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 '>
                  Next
                </span>
              ) : (
                <Link
                  className='rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 '
                  to={`/students?page=${page + 1}`}
                >
                  Next
                </Link>
              )}
            </li>

          </ul>
        </nav>
      </div>
    </div>
  )
}
