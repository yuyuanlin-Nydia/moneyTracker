import { User } from '.'

export default defineEventHandler(async (event) => {
  try {
    const cookies = parseCookies(event)
    if (!cookies.token)
      return { success: true, message: null }

    const user = await User.aggregate([
      {
        $match: {
          'tokens.token': { $in: [cookies.token] },
        },
      }, {
        $project: {
          _id: 0,
          password: 0,
          registerDate: 0,
          tokens: 0,
        },
      },
    ],
    )
    return {
      success: true,
      message: {
        user: user[0],
      },
    }
  }
  catch (err: any) {
    console.log(err.message)
    return {
      success: false,
      error: {
        code: 1001,
        message: err.message,
      },
    }
  }
})
