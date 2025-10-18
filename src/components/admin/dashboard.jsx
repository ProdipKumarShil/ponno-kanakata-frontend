"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart as RechartsBarChart,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const salesData = [
  { month: "Jan", sales: 12000 },
  { month: "Feb", sales: 15000 },
  { month: "Mar", sales: 18000 },
  { month: "Apr", sales: 22000 },
  { month: "May", sales: 25000 },
  { month: "Jun", sales: 28000 },
];
const salesChartConfig = {
  sales: { label: "Sales", color: "hsl(var(--primary))" },
};

const revenueData = [
  { date: "2024-01-01", revenue: 500, expenses: 200 },
  { date: "2024-02-01", revenue: 600, expenses: 250 },
  { date: "2024-03-01", revenue: 750, expenses: 300 },
  { date: "2024-04-01", revenue: 900, expenses: 400 },
  { date: "2024-05-01", revenue: 800, expenses: 350 },
];
const revenueChartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--chart-2))" },
  expenses: { label: "Expenses", color: "hsl(var(--chart-5))" },
};

const categoryData = [
  { name: "Fashion", value: 400 },
  { name: "Organic", value: 300 },
  { name: "Electronics", value: 300 },
  { name: "Groceries", value: 200 },
];
const categoryChartConfig = {
  fashion: { label: "Fashion", color: "hsl(var(--chart-1))" },
  organic: { label: "Organic", color: "hsl(var(--chart-2))" },
  electronics: { label: "Electronics", color: "hsl(var(--chart-3))" },
  groceries: { label: "Groceries", color: "hsl(var(--chart-4))" },
};

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"];

const content = {
    en: {
        dashboard: "Dashboard",
        welcome: "Welcome back! Here's a snapshot of your store.",
        totalSales: "Total Sales",
        fromLastMonth: "from last month",
        activeUsers: "Active Users",
        newUsersThisWeek: "new users this week",
        pendingOrders: "Pending Orders",
        needsProcessing: "Needs processing",
        totalProducts: "Total Products",
        newProductsAdded: "new products added",
        salesOverTime: "Sales Over Time",
        revenueVsExpenses: "Revenue vs. Expenses",
        salesByCategory: "Sales by Category",
        recentActivity: "Recent Activity",
        auditLogInfo: "Audit log will be displayed here."
    },
    bn: {
        dashboard: "ড্যাশবোর্ড",
        welcome: "আবারও স্বাগতম! এখানে আপনার দোকানের একটি স্ন্যাপশট।",
        totalSales: "মোট বিক্রয়",
        fromLastMonth: "গত মাস থেকে",
        activeUsers: "সক্রিয় ব্যবহারকারী",
        newUsersThisWeek: "এই সপ্তাহে নতুন ব্যবহারকারী",
        pendingOrders: "অমীমাংসিত অর্ডার",
        needsProcessing: "প্রসেসিং প্রয়োজন",
        totalProducts: "মোট পণ্য",
        newProductsAdded: "নতুন পণ্য যোগ হয়েছে",
        salesOverTime: "সময়ের সাথে বিক্রয়",
        revenueVsExpenses: "আয় বনাম ব্যয়",
        salesByCategory: "ক্যাটাগরি অনুযায়ী বিক্রয়",
        recentActivity: "সাম্প্রতিক কার্যকলাপ",
        auditLogInfo: "অডিট লগ এখানে প্রদর্শিত হবে।"
    }
}


export default function AdminDashboard({ language }) {
  const t = content[language];
  return (
    <div>
        <div className="mb-6">
            <h1 className="text-3xl font-bold">{t.dashboard}</h1>
            <p className="text-muted-foreground">{t.welcome}</p>
        </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>{t.totalSales}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">$120,500</p>
            <p className="text-xs text-muted-foreground">+12.5% {t.fromLastMonth}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t.activeUsers}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">1,250</p>
            <p className="text-xs text-muted-foreground">+50 {t.newUsersThisWeek}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t.pendingOrders}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">32</p>
            <p className="text-xs text-muted-foreground">{t.needsProcessing}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t.totalProducts}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">248</p>
            <p className="text-xs text-muted-foreground">12 {t.newProductsAdded}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t.salesOverTime}</CardTitle>
          </CardHeader>
          <CardContent>
             <ChartContainer config={salesChartConfig} className="h-[300px] w-full">
                <RechartsBarChart data={salesData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
                </RechartsBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t.revenueVsExpenses}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={revenueChartConfig} className="h-[300px] w-full">
                <RechartsLineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" />
                    <Line type="monotone" dataKey="expenses" stroke="var(--color-expenses)" />
                </RechartsLineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-6 mt-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>{t.salesByCategory}</CardTitle>
                </CardHeader>
                <CardContent>
                     <ChartContainer config={categoryChartConfig} className="h-[300px] w-full">
                        <RechartsPieChart>
                             <Tooltip content={<ChartTooltipContent />} />
                            <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                        </RechartsPieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            {/* Add another chart or info card here */}
             <Card>
                <CardHeader>
                    <CardTitle>{t.recentActivity}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-center py-12">{t.auditLogInfo}</p>
                </CardContent>
            </Card>
       </div>

    </div>
  );
}
