import { BlizzAPI } from 'blizzapi';
import { db } from 'db/connection.server';
import {
  achievementCategories as achievementCategoriesTable,
  achievements as achievementsTable,
} from 'db/schema.server';
import { json } from '@remix-run/node';

export async function loader() {
  const api = new BlizzAPI({
    region: 'us',
    clientId: process.env.BATTLE_NET_CLIENT_ID,
    clientSecret: process.env.BATTLE_NET_CLIENT_SECRET,
  });

  const achievementCategories: any[] = [];

  const achievementsData: any = await api.query(
    '/data/wow/achievement/index?region=us&namespace=static-us'
  );

  for (const achievement of achievementsData.achievements) {
    const achievementData: any = await api.query(
      `/data/wow/achievement/${achievement.id}?region=us&namespace=static-us`
    );

    await db.insert(achievementsTable).values({
      externalId: achievementData.id,
      name: achievementData.name.en_US,
      description: achievementData.description.en_US,
      isAccountWide: achievementData.is_account_wide,
      displayOrder: achievementData.display_order,
      externalCategoryId: achievementData.category.id,
      points: achievementData.points,
    });

    // Doing all of the below to programmatically compute the amount of
    // achievements per category rather than hard coding it in.
    const foundAchievementCategoryIndex = achievementCategories.findIndex(
      (ac) => ac.externalId === achievementData.category.id
    );

    if (foundAchievementCategoryIndex >= 0) {
      achievementCategories[foundAchievementCategoryIndex] = {
        ...achievementCategories[foundAchievementCategoryIndex],
        achievementCount:
          achievementCategories[foundAchievementCategoryIndex]
            .achievementCount + 1,
      };
    } else {
      achievementCategories.push({
        externalId: achievementData.category.id,
        name: achievementData.category.name.en_US,
        achievementCount: 1,
      });
    }
  }

  // Add to the DB the achievement categories that got built out
  // during the above loop and the respective total achievement counts
  // per category.
  for (const achievementCategory of achievementCategories) {
    const achievementCategoryData: any = await api.query(
      `/data/wow/achievement-category/${achievementCategory.externalId}?region=us&namespace=static-us`
    );

    await db.insert(achievementCategoriesTable).values({
      externalId: achievementCategory.externalId,
      name: achievementCategory.name,
      achievementCount: achievementCategory.achievementCount,
      parentExternalId:
        'parent_category' in achievementCategoryData
          ? achievementCategoryData.parent_category.id
          : null,
    });
  }

  return json({ success: true }, 200);
}
