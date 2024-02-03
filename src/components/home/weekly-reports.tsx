import { CalendarOutlined } from '@ant-design/icons'
import { Alert, Badge, Card, List } from 'antd'
import React, { useState } from 'react'
import { Text } from '../text'
import WeeklyReportsSkeleton from '../skeleton/weekly-reports'
import { getDate } from '@/utilities/helpers'
import { useList } from '@refinedev/core'
import { DASHBORAD_WEEKLY_REPORTS_QUERY } from '@/graphql/queries'
import dayjs from 'dayjs'

const WeeklyReports = () => {

    const { data, isLoading } = useList({
        resource: 'events',
        sorters: [
            {
                field: 'startDate',
                order: 'asc'
            }
        ],
        filters: [
            {
                field: 'startDate',
                operator: 'gte',
                value: dayjs().format('YYYY-DD-MM')
            }
        ],
        pagination: {pageSize: 5},
        meta: {
            gqlQuery: DASHBORAD_WEEKLY_REPORTS_QUERY,
        }
    });

    


  return (
    <Card 
    style={{height: '100%'}} 
    headStyle={{padding: '8px 16px'}} 
    bodyStyle={{padding: '0 1rem'}}
    title={
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        }}>
            <CalendarOutlined />
            <Text size="sm" style={{marginLeft: "0.7rem" }}>
                Weekly Reports
            </Text>

        </div>
    }
    
    >
        {isLoading ? (
            <List
            itemLayout="horizontal"
            dataSource={Array.from({length: 5}).map((_, index) =>({
                id: index, 
            }))}
            renderItem={() => <WeeklyReportsSkeleton/>}
            >

            </List>
        ): (
            <List
            itemLayout="horizontal"
            dataSource={data?.data || []}
            renderItem={(item)=>{
                const renderDate = getDate(item.startDate, item.endDate)
                return(
                    <List.Item>
                        <List.Item.Meta
                        avatar={<Badge color={item.color} />}
                        title={<Text size="xs">{renderDate}</Text>}
                        description={<Text ellipsis={{tooltip: true}} strong>
                            {item.title}
                        </Text>}
                        />
                    </List.Item>
                )
            }}
            />
                
        )}
            {!isLoading && data?.data.length === 0 && (
                <span
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '220px'
                }}
                >
                    No weekly reports
                </span>
            )}
    </Card>
  )
}

export default WeeklyReports