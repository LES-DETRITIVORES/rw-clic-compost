import { Link, routes } from '@redwoodjs/router'

const SchedulePage = () => {
  return (
    <div class="min-h-screen py-6 px-6 flex flex-col justify-center sm:py-12 relative sm:max-w-xl sm:mx-auto space-y-12">
      <div>
        <img src="/logo.png" class="object-contain h-48 w-full" />
      </div>
      <p class="font-semibold space-y-10 mb-20 text-center">
      <div class="transform -rotate-2">
          <div>On prend <span class="bg-gray-900 text-white p-1 rounded-md">rendez-vous</span> ?</div>
          <div class="px-4 py-3">
            Pour&nbsp;
            <select class="px-4 py-3 rounded-full" className="keyword">
              <option>Aujourd'hui</option>
              <option>Demain</option>
              <option>Après-demain</option>
            </select>
            &nbsp;à&nbsp;
            <select class="px-4 py-3 rounded-full" className="keyword">
              <option>9h - 12h</option>
              <option>12h - 14h</option>
              <option>14h - 17h</option>
            </select>
          </div>
      </div>
      </p >
      <Link to={routes.payment()} className="next">
        Je réserve
      </Link>
    </div >
  )
}

export default SchedulePage
