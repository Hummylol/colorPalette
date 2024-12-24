'use client'

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Component } from '@/components/Chart'
import { PieChartComponent } from '@/components/PieChart'
import { BarChartComponent } from "@/components/BarChart"
import ChatBox from "@/components/ChatBox"
import { Button } from "@/components/ui/button"

export default function Page() {
  const [isChatOpen, setIsChatOpen] = useState(false) // Manage chat visibility



 

  const handleCloseChat = () => {
    setIsChatOpen(false) // Close chat dialog
  }

  const handleOpenChat = () => {
    setIsChatOpen(true) // Open chat dialog
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl"><Component /></div>
            <div className="aspect-video rounded-xl"><PieChartComponent /></div>
            <div
              className={`rounded-xl p-4 transition-all duration-300 border-2`}
              style={{ backgroundColor: "" }}
            >
              {isChatOpen ? (
                <ChatBox onClose={handleCloseChat} />
              ) : (
                <div className="flex justify-center items-center h-full">
                  <Button onClick={handleOpenChat}  >Open Chat</Button>
                </div>
              )}
            </div>
          </div>
          <div className="min-h-[100vh] w-[60vw] flex-1 rounded-xl md:min-h-min" />
          <BarChartComponent />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
